// Public repositories disable schedules after 60 days without repository activity.
// An empty same-tree commit after 28 days prevents that without editing application files.
export async function keepScheduleActive({github,owner,repo,now=new Date()}) {
  const git=github.rest.git;
  const parent=(await git.getRef({owner,repo,ref:'heads/main'})).data.object.sha;
  const commit=(await git.getCommit({owner,repo,commit_sha:parent})).data;
  const age=now.getTime()-new Date(commit.committer.date).getTime();
  if(!Number.isFinite(age)||age<0)throw new Error('Cannot verify source activity date.');
  if(age<28*24*60*60*1000)return 'recent_source_activity';
  const child=(await git.createCommit({owner,repo,message:'chore: keep weekly raffle schedule active',tree:commit.tree.sha,parents:[parent]})).data.sha;
  try { await git.updateRef({owner,repo,ref:'heads/main',sha:child,force:false}); }
  catch(error) {
    if((await git.getRef({owner,repo,ref:'heads/main'})).data.object.sha!==parent)return 'concurrent_source_activity';
    throw error;
  }
  return (await git.getRef({owner,repo,ref:'heads/main'})).data.object.sha===child ? 'keepalive_committed' : 'concurrent_source_activity';
}
