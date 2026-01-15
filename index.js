import { readFileSync, readdirSync } from 'fs';
import { createServer } from 'http';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const FONTS_DIR = join(__dirname, 'fonts');

// Get font MIME type based on extension
function getFontMimeType(ext) {
  const mimeTypes = {
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.eot': 'application/vnd.ms-fontobject'
  };
  return mimeTypes[ext.toLowerCase()] || 'font/ttf';
}

// Convert fonts to base64 data URLs
function embedFonts(html) {
  try {
    const files = readdirSync(FONTS_DIR);
    let modifiedHtml = html;

    files.forEach(file => {
      const ext = extname(file);
      if (['.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(ext.toLowerCase())) {
        const fontPath = join(FONTS_DIR, file);
        const fontData = readFileSync(fontPath);
        const base64Font = fontData.toString('base64');
        const mimeType = getFontMimeType(ext);
        const dataUrl = `data:${mimeType};base64,${base64Font}`;
        
        // Replace font file references with data URLs
        const patterns = [
          new RegExp(`url\\(['"]?/fonts/${file}['"]?\\)`, 'g'),
          new RegExp(`url\\(['"]?\\.\\./fonts/${file}['"]?\\)`, 'g'),
          new RegExp(`url\\(['"]?\\./fonts/${file}['"]?\\)`, 'g'),
          new RegExp(`url\\(['"]?fonts/${file}['"]?\\)`, 'g')
        ];

        patterns.forEach(pattern => {
          modifiedHtml = modifiedHtml.replace(pattern, `url('${dataUrl}')`);
        });

      }
    });

    return modifiedHtml;
  } catch (error) {
    console.warn('⚠️  Could not embed fonts:', error.message);
    return html;
  }
}

// Load resume data and render HTML
async function getResumeHTML() {
  try {
    const { render } = await import('./jsonresume-theme-professional/dist/index.js');
    const resumeData = JSON.parse(readFileSync('./resume.json', 'utf-8'));
    
    let html = render(resumeData);
    
    html = embedFonts(html);
    
    return html;
  } catch (error) {
    console.error('❌ Error:', error);
    return `<h1>Error loading resume</h1><pre>${error.message}</pre>`;
  }
}

// Create server
const server = createServer(async (req, res) => {
  const html = await getResumeHTML();
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`🚀 Resume server running at Port: ${PORT}`);
});