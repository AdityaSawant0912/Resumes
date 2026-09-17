import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const [, , localSha, remoteSha] = process.argv;

const ZERO_SHA = '0000000000000000000000000000000000000000';
if (!localSha || localSha === ZERO_SHA) process.exit(0); // branch delete

const repoRoot = execSync('git rev-parse --show-toplevel').toString().trim();
const resumePath = join(repoRoot, 'resume.json');
const indexPath = join(repoRoot, 'public', 'timeline-data', 'index.json');
const versionsDir = join(repoRoot, 'public', 'timeline-data', 'versions');

const resumeContent = readFileSync(resumePath, 'utf-8');

const index = existsSync(indexPath) ? JSON.parse(readFileSync(indexPath, 'utf-8')) : [];
const lastEntry = index[index.length - 1];

if (lastEntry) {
  const lastSnapshotPath = join(repoRoot, 'public', lastEntry.file);
  if (existsSync(lastSnapshotPath)) {
    const lastContent = readFileSync(lastSnapshotPath, 'utf-8');
    if (lastContent === resumeContent) process.exit(0); // no resume.json change, nothing to record
  }
}

const range = !remoteSha || remoteSha === ZERO_SHA ? localSha : `${remoteSha}..${localSha}`;
const log = execSync(`git log --format=%s ${range}`).toString().trim();
const messages = log ? log.split('\n') : [];

const id = localSha.slice(0, 8);

if (!existsSync(versionsDir)) mkdirSync(versionsDir, { recursive: true });
writeFileSync(join(versionsDir, `${id}.json`), resumeContent);

index.push({
  id,
  prevId: lastEntry ? lastEntry.id : null,
  date: new Date().toISOString(),
  messages,
  file: `timeline-data/versions/${id}.json`
});
writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n');

execSync(
  `git add "${join('public', 'timeline-data', 'index.json')}" "${join('public', 'timeline-data', 'versions', `${id}.json`)}"`,
  { cwd: repoRoot }
);
execSync(`git commit -m "chore(timeline): snapshot ${id}"`, { cwd: repoRoot });

console.log(`timeline: recorded snapshot ${id}`);
