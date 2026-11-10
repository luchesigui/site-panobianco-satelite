import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { fetchEligibleMembers } from './raffle-eligibility.mjs';
import { GitRaffleStore } from './raffle-git-store.mjs';
import { runRafflePeriod } from './raffle-production.mjs';
import { resolveRaffleRun } from './raffle-schedule.mjs';
import { validateReplay } from './raffle-replay.mjs';
import { startCaptureBrowser } from './sorteio-headless.mjs';
import { assertRaffleVideo } from './sorteio-video.mjs';
import { buildRaffleEmail, sendRaffleEmail } from './raffle-email.mjs';
const exec=promisify(execFile);
const root=fileURLToPath(new URL('../',import.meta.url));
let stage='configuration';

async function alertEmail(subject,key) {
  return sendRaffleEmail({apiKey:process.env.RESEND_API_KEY,idempotencyKey:key,payload:{
    from:process.env.RAFFLE_EMAIL_FROM,to:[process.env.RAFFLE_EMAIL_TO],subject,
    text:`O sorteio semanal precisa de verificação. Nenhum novo sorteio deve ser realizado para corrigir gravação ou envio. Consulte a execução e use somente recuperação do resultado salvo.\n\nhttps://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
  }});
}
async function main() {
  if (process.argv.includes('--check')) { console.log('Weekly cloud runner ready. No draw or email.'); return; }
  const config=resolveRaffleRun({mode:process.env.RAFFLE_MODE,eventName:process.env.GITHUB_EVENT_NAME,ref:process.env.GITHUB_REF,period:process.env.RAFFLE_PERIOD,runId:process.env.GITHUB_RUN_ID});
  const loadLive=()=>fetchEligibleMembers({dns:process.env.EVO_DNS,token:process.env.EVO_TOKEN,branchId:process.env.EVO_BRANCH_ID});
  if (config.mode==='preflight') {
    stage='eligibility_preflight';
    const members=await loadLive();
    if (!members.length) throw new Error('Empty participant pool.');
    console.log(JSON.stringify({preflight:true,eligibleCount:members.length,drawPerformed:false})); return;
  }
  for (const key of ['RESEND_API_KEY','RAFFLE_EMAIL_FROM','RAFFLE_EMAIL_TO','RAFFLE_STATE_DIR']) if(!process.env[key]) throw new Error('Missing cloud configuration.');
  const stateDir=path.resolve(process.env.RAFFLE_STATE_DIR);
  stage='private_state';
  const remote=(await exec('git',['-C',stateDir,'config','--get','remote.origin.url'])).stdout.trim();
  if(!/^(?:git@github\.com:|https:\/\/github\.com\/)luchesigui\/panobianco-raffle-state(?:\.git)?$/.test(remote)) throw new Error('State target is not the dedicated repository.');
  const visibility=await fetch('https://api.github.com/repos/luchesigui/panobianco-raffle-state',{headers:{'User-Agent':'Panobianco-Raffle-Privacy-Guard'},signal:AbortSignal.timeout(15_000)});
  if(visibility.status!==404)throw new Error('State repository is public or privacy cannot be confirmed.');
  const store=new GitRaffleStore(stateDir);
  if(config.mode==='watchdog') {
    const saved=await store.read(config.key);
    if(saved?.data.status!=='sent') { await alertEmail('[ALERTA] Sorteio semanal sem envio confirmado',`watchdog-${config.key}`); console.log(JSON.stringify({status:'missing_delivery_alerted'})); }
    else console.log(JSON.stringify({status:'delivery_checkpoint_confirmed'}));
    return;
  }
  const dir=await mkdtemp(path.join(process.env.CAPTURE_TEMP_ROOT||tmpdir(),'raffle-weekly-'));
  try {
    const result=await runRafflePeriod({...config,store,
      loadMembers:async()=>{
        stage='eligibility';
        if(config.mode==='mock') return Array.from({length:12},(_,i)=>({idMember:i+1,firstName:i===11?'Pessoa':'Participante',lastName:i===11?'Ficticia':String(i+1).padStart(2,'0'),displayName:i===11?'Pessoa Ficticia':`Participante ${String(i+1).padStart(2,'0')}`}));
        return loadLive();
      },
      ...(config.mode==='mock'?{randomIndex:()=>11}:{}),
      renderEmail:async saved=>{
        stage='render'; validateReplay(saved);
        const replayFile=path.join(dir,'replay.json');
        await writeFile(replayFile,JSON.stringify({members:saved.members,winner:saved.winner}),{mode:0o600});
        const browser=await startCaptureBrowser(path.join(dir,'browser'));
        try {
          const env={...process.env,CAPTURE_REPLAY_FILE:replayFile,CAPTURE_FORMAT:'reels',CAPTURE_MOCK:'0',CAPTURE_WINNER:'',CAPTURE_OUTPUT_DIR:dir,CAPTURE_CDP_ORIGIN:browser.origin};
          for(const key of ['EVO_DNS','EVO_TOKEN','RESEND_API_KEY','RAFFLE_EMAIL_FROM','RAFFLE_EMAIL_TO']) delete env[key];
          const {stdout}=await exec(process.execPath,['scripts/record-sorteio.mjs'],{cwd:root,timeout:180_000,maxBuffer:2*1024*1024,env});
          const metadata=JSON.parse(stdout.trim().split('\n').findLast(line=>line.startsWith('{')));
          const videoPath=path.resolve(metadata.videoPath);
          if(path.dirname(videoPath)!==dir||String(metadata.winnerId)!==String(saved.winner.id))throw new Error('Saved result and capture mismatch.');
          stage='video_verification';
          const probe=JSON.parse((await exec('ffprobe',['-v','error','-show_entries','format=duration,size:stream=codec_name,width,height,avg_frame_rate','-of','json',videoPath])).stdout);
          assertRaffleVideo(probe);
          console.log(JSON.stringify({verified:true,width:1080,height:1920,duration:probe.format.duration,bytes:probe.format.size}));
          return buildRaffleEmail({winner:saved.winner,video:await readFile(videoPath),from:process.env.RAFFLE_EMAIL_FROM,to:process.env.RAFFLE_EMAIL_TO,mode:config.mode});
        } finally {await browser.close();}
      },
      send:async(payload,key)=>{stage='email';return sendRaffleEmail({apiKey:process.env.RESEND_API_KEY,payload,idempotencyKey:key});},
    });
    console.log(JSON.stringify({mode:config.mode,period:config.key,...result}));
  } finally {await rm(dir,{recursive:true,force:true});}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  main().catch(async error=>{
    console.error(JSON.stringify({status:'failed',stage,reason:/^[A-Z_]+$/.test(error.safeReason||'')?error.safeReason:'CHECK_PRIVATE_STATE_AND_WORKFLOW'}));
    if(stage!=='configuration'&&['live','recover','watchdog'].includes(process.env.RAFFLE_MODE))try{await alertEmail('[ALERTA] Falha na automação do sorteio',`failure-${process.env.GITHUB_RUN_ID}`);}catch{console.error('Failure email unavailable; GitHub run remains failed.');}
    process.exitCode=1;
  });
}
