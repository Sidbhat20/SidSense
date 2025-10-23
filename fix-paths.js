const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Function to process HTML files
function processHTMLFiles() {
  const htmlFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.html'));
  
  htmlFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace ALL variations of image paths
    content = content.replace(/src="\/images\//g, 'src="/SidSense/images/');
    content = content.replace(/href="\/images\//g, 'href="/SidSense/images/');
    content = content.replace(/src="\.\/images\//g, 'src="/SidSense/images/');
    content = content.replace(/href="\.\/images\//g, 'href="/SidSense/images/');
    content = content.replace(/src="images\//g, 'src="/SidSense/images/');
    content = content.replace(/href="images\//g, 'href="/SidSense/images/');
    
    // Fix asset paths
    content = content.replace(/src="\/assets\//g, 'src="/SidSense/assets/');
    content = content.replace(/href="\/assets\//g, 'href="/SidSense/assets/');
    content = content.replace(/src="\.\/assets\//g, 'src="/SidSense/assets/');
    content = content.replace(/href="\.\/assets\//g, 'href="/SidSense/assets/');
    
    // Fix font paths
    content = content.replace(/src="\/fonts\//g, 'src="/SidSense/fonts/');
    content = content.replace(/href="\/fonts\//g, 'href="/SidSense/fonts/');
    content = content.replace(/src="\.\/fonts\//g, 'src="/SidSense/fonts/');
    content = content.replace(/href="\.\/fonts\//g, 'href="/SidSense/fonts/');
    
    // Fix page navigation links - all variations
    content = content.replace(/href="\/work\.html"/g, 'href="/SidSense/work.html"');
    content = content.replace(/href="\/about\.html"/g, 'href="/SidSense/about.html"');
    content = content.replace(/href="\/contact\.html"/g, 'href="/SidSense/contact.html"');
    content = content.replace(/href="\/project\.html"/g, 'href="/SidSense/project.html"');
    content = content.replace(/href="\/index\.html"/g, 'href="/SidSense/"');
    
    content = content.replace(/href="\.\/work\.html"/g, 'href="/SidSense/work.html"');
    content = content.replace(/href="\.\/about\.html"/g, 'href="/SidSense/about.html"');
    content = content.replace(/href="\.\/contact\.html"/g, 'href="/SidSense/contact.html"');
    content = content.replace(/href="\.\/project\.html"/g, 'href="/SidSense/project.html"');
    content = content.replace(/href="\.\/index\.html"/g, 'href="/SidSense/"');
    content = content.replace(/href="\.\/project"/g, 'href="/SidSense/project.html"');
    content = content.replace(/href="\/project"/g, 'href="/SidSense/project.html"');
    
    // Fix root path references  
    content = content.replace(/href="\/">/g, 'href="/SidSense/">');
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✓ Fixed paths in: ${file}`);
  });
}

processHTMLFiles();
console.log('✅ All HTML files have been processed with absolute paths!');
