import { readFileSync } from 'fs';
import { join } from 'path';
import { embedFonts } from '../lib/embedFonts.js';

const ID_PATTERN = /^[a-f0-9]{8}$/;
const PRINT_BUTTON = `<button onclick="window.print()" style="position:fixed;top:12px;right:12px;z-index:1000;padding:8px 14px;font:14px sans-serif;cursor:pointer;" class="no-print">Print / Save as PDF</button><style>@media print{.no-print{display:none}}</style>`;

export default async function handler(req, res) {
  const { id } = req.query;

  if (typeof id !== 'string' || !ID_PATTERN.test(id)) {
    res.status(400).send('Invalid version id');
    return;
  }

  let snapshot;
  try {
    const snapshotPath = join(process.cwd(), 'public', 'timeline-data', 'versions', `${id}.json`);
    snapshot = JSON.parse(readFileSync(snapshotPath, 'utf-8'));
  } catch {
    res.status(404).send('Version not found');
    return;
  }

  const { render } = await import('../lib/theme/index.js');
  let html = render(snapshot);
  html = embedFonts(html);
  // Drop the live-resume's Ctrl/Cmd+P intercept (downloads a static PDF that
  // doesn't exist for historical versions) so print falls through to the
  // browser's native dialog instead.
  html = html.replace(/<script>[\s\S]*?keydown[\s\S]*?<\/script>/, '');
  html = html.replace('</body>', `${PRINT_BUTTON}</body>`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
