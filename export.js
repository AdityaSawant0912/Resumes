import { readFileSync } from 'fs';
import puppeteer from 'puppeteer';
import { embedFonts } from './lib/embedFonts.js';

// Configuration
const RESUME_JSON_PATH = './resume.json';
const OUTPUT_PDF = './public/Aditya Rajesh Sawant.pdf';

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