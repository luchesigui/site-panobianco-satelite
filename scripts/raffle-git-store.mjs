import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';

// This directory must be a clone of the dedicated PRIVATE state repository.
// Never point it at the public website checkout. State bodies are never logged.
export class GitRaffleStore {
  constructor(directory) { this.directory = directory; }
  async git(args, input) {
    return new Promise((resolve, reject) => {
      const child = spawn('git', ['-C', this.directory, ...args], { stdio: ['pipe','pipe','pipe'] });
      const chunks = []; let size = 0;
      const timeout = setTimeout(() => { child.kill('SIGKILL'); }, 90_000);
      child.stdout.on('data', chunk => { size += chunk.length; if (size > 40 * 1024 * 1024) child.kill('SIGKILL'); else chunks.push(chunk); });
      child.stderr.resume();
      child.once('error', () => { clearTimeout(timeout); reject(new Error('Private state Git process failed.')); });
      child.once('close', code => {
        clearTimeout(timeout);
        if (code === 0) resolve(Buffer.concat(chunks).toString('utf8').trim());
        else { const error = new Error('Private state operation failed; abort without drawing or resending.'); error.exitCode = code; reject(error); }
      });
      child.stdin.on('error', () => {});
      child.stdin.end(input);
    });
  }
  ref(key) {
    if (!/^(mock|live)-[a-z0-9-]{1,70}$/.test(key)) throw new Error('Invalid state key.');
    return `refs/heads/${key}`;
  }
  async read(key) {
    const ref = this.ref(key);
    try { await this.git(['ls-remote', '--exit-code', 'origin', ref]); }
    catch (error) { if (error.exitCode === 2) return null; throw error; }
    await this.git(['fetch', '--quiet', 'origin', ref]);
    const revision = await this.git(['rev-parse', 'FETCH_HEAD']);
    const data = JSON.parse(await this.git(['show', `${revision}:state.json`]));
    return { revision, data };
  }
  async create(key, data) { return this.write(key, data, ''); }
  async update(key, data, revision) {
    if (!/^[a-f0-9]{40,64}$/.test(revision || '')) throw new Error('Invalid state revision.');
    return this.write(key, data, revision);
  }
  async write(key, data, expected) {
    const ref = this.ref(key);
    const parent = expected || await this.git(['rev-parse', 'origin/main']);
    const blob = await this.git(['hash-object', '-w', '--stdin'], JSON.stringify(data));
    const tree = await this.git(['mktree'], `100644 blob ${blob}\tstate.json\n`);
    const commit = await this.git(['-c','user.name=Panobianco Raffle','-c','user.email=raffle-runner@users.noreply.github.com','commit-tree',tree,'-p',parent], `Raffle checkpoint ${randomUUID()}\n`);
    await this.git(['push','--quiet',`--force-with-lease=${ref}:${expected}`,'origin',`${commit}:${ref}`]);
    const saved = await this.read(key);
    if (saved?.revision !== commit) throw new Error('Private checkpoint readback failed; stop.');
    return saved;
  }
}
