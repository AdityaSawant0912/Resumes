import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const RESUME_JSON_PATH = './resume.json';
const FONTS_DIR = join(__dirname, 'fonts');
const OUTPUT_HTML = './resume.html';
const OUTPUT_PDF = './public/Aditya Rajesh Sawant.pdf';

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
        // Handle various possible path formats, especially /fonts/filename
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

async function generateResume() {
  try {
    const resume = JSON.parse(readFileSync(RESUME_JSON_PATH, 'utf-8'));

    const { render } = await import('./jsonresume-theme-professional/dist/index.js');

    let html = render(resume);

    html = embedFonts(html);

    // Save HTML with embedded fonts
    // writeFileSync(OUTPUT_HTML, html);

    
    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set media type to screen for better rendering
    await page.emulateMediaType('screen');
    
    // Load the HTML content
    const base64Html = Buffer.from(html).toString('base64');
    await page.goto(`data:text/html;base64,${base64Html}`, {
      waitUntil: 'networkidle0'
    });

    // Wait a bit for fonts to render
    await page.waitForTimeout(500);

    // Generate PDF
    await page.pdf({
      path: OUTPUT_PDF,
      format: 'A4',
      pageRanges: '1-1',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      }
    });

    await browser.close();
    

    console.log('Generated resume');
  } catch (error) {
    console.error('Error generating resume:', error.message);
    console.error(error);
    process.exit(1);
  }
}

generateResume();