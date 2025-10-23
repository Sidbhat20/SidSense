const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Function to process HTML files
function processHTMLFiles() {
  const htmlFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.html'));
  
  htmlFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace relative paths with root-relative paths (starting with /)
    // GitHub Pages will serve from /SidSense/ automatically based on repo name
    content = content.replace(/src="\.\/images\//g, 'src="/SidSense/images/');
    content = content.replace(/href="\.\/images\//g, 'href="/SidSense/images/');
    
    // Also fix any remaining relative asset paths
    content = content.replace(/src="\.\/assets\//g, 'src="/SidSense/assets/');
    content = content.replace(/href="\.\/assets\//g, 'href="/SidSense/assets/');
    content = content.replace(/src="\.\/fonts\//g, 'src="/SidSense/fonts/');
    content = content.replace(/href="\.\/fonts\//g, 'href="/SidSense/fonts/');
    
    // Fix page navigation links
    content = content.replace(/href="\.\/work\.html"/g, 'href="/SidSense/work.html"');
    content = content.replace(/href="\.\/about\.html"/g, 'href="/SidSense/about.html"');
    content = content.replace(/href="\.\/contact\.html"/g, 'href="/SidSense/contact.html"');
    content = content.replace(/href="\.\/project\.html"/g, 'href="/SidSense/project.html"');
    content = content.replace(/href="\.\/index\.html"/g, 'href="/SidSense/"');
    content = content.replace(/href="\.\/project"/g, 'href="/SidSense/project.html"');
    
    // Fix root path references  
    content = content.replace(/href="\/">/g, 'href="/SidSense/">');
    
    console.log(`✓ Fixed paths in: ${file}`);
  });
}

processHTMLFiles();
console.log('✅ All HTML files have been processed with absolute paths!');
