import { readFileSync, writeFileSync } from 'fs';
import { embedFonts } from './lib/embedFonts.js';

async function build() {
  try {
    console.log('🔨 Building resume...');
    
    const { render } = await import('./lib/theme/index.js');
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