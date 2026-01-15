import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FONTS_DIR = join(__dirname, 'fonts');

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
        
        const patterns = [
          new RegExp(`url\\(['"]?/fonts/${file}['"]?\\)`, 'g'),
          new RegExp(`url\\(['"]?\\.\\./fonts/${file}['"]?\\)`, 'g'),
          new RegExp(`url\\(['"]?\\./fonts/${file}['"]?\\)`, 'g'),
          new RegExp(`url\\(['"]?fonts/${file}['"]?\\)`, 'g')
        ];

        patterns.forEach(pattern => {
          modifiedHtml = modifiedHtml.replace(pattern, `url('${dataUrl}')`);
        });

        console.log(`   ✓ Embedded font: ${file}`);
      }
    });

    return modifiedHtml;
  } catch (error) {
    console.warn('⚠️  Could not embed fonts:', error.message);
    return html;
  }
}

async function build() {
  try {
    console.log('🔨 Building resume...');
    
    const { render } = await import('./jsonresume-theme-professional/dist/index.js');
    const resumeData = JSON.parse(readFileSync('./resume.json', 'utf-8'));
    
    console.log('📄 Rendering HTML...');
    let html = render(resumeData);
    
    console.log('🔤 Embedding fonts...');
    html = embedFonts(html);
    
    writeFileSync('public/index.html', html);
    console.log('✅ Resume built to public/index.html');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();