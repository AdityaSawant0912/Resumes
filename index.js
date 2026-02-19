import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const RESUME_JSON_PATH = './resume.json';
const FONTS_DIR = join(__dirname, 'fonts');
const OUTPUT_HTML = './public/index.html';
const OUTPUT_PDF = './Aditya Rajesh Sawant.pdf';
const THEME_PATH = './lib/theme/index.js';

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

async function generate() {
  try {
    console.log('🔨 Building resume...');

    // Ensure output directory exists
    mkdirSync('./public', { recursive: true });

    // Load resume data and render HTML
    const resume = JSON.parse(readFileSync(RESUME_JSON_PATH, 'utf-8'));
    const { render } = await import(THEME_PATH);

    console.log('📄 Rendering HTML...');
    let html = render(resume);

    console.log('🔤 Embedding fonts...');
    html = embedFonts(html);

    // Write HTML output
    writeFileSync(OUTPUT_HTML, html);
    console.log(`✅ HTML written to ${OUTPUT_HTML}`);

    // Generate PDF via Puppeteer
    console.log('🖨️  Generating PDF...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.emulateMediaType('screen');

    const base64Html = Buffer.from(html).toString('base64');
    await page.goto(`data:text/html;base64,${base64Html}`, {
      waitUntil: 'networkidle0'
    });

    // Wait for fonts to render
    await page.waitForTimeout(500);

    await page.pdf({
      path: OUTPUT_PDF,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.2in',
        right: '0.5in',
        bottom: '0.2in',
        left: '0.5in'
      }
    });

    await browser.close();
    console.log(`✅ PDF written to ${OUTPUT_PDF}`);

    console.log('🎉 Done!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

generate();