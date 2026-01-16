import { cpSync, rmSync, mkdirSync } from 'fs';

try {
  // Remove old theme
  rmSync('lib/theme', { recursive: true, force: true });
  
  // Create lib directory
  mkdirSync('lib', { recursive: true });
  
  // Copy theme
  cpSync('jsonresume-theme-professional/dist', 'lib/theme', { recursive: true });
  
  console.log('✅ Theme copied to lib/theme');
} catch (error) {
  console.error('❌ Copy failed:', error);
  process.exit(1);
}