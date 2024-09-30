const http = require('http');  // Include the HTTP module
const fs = require('fs');
const path = require('path');

// Define the port to use
const PORT = process.env.PORT || 3000;

// Serve the static files (e.g., HTML, CSS, JS)
const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';  // Default to index.html if no specific file is requested
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml'
  };

  // Read and serve the requested file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');  // Serve a 404 page
      } else {
        res.writeHead(500);
        res.end(`Sorry, an error occurred: ${error.code} ..\n`);
      }
    } else {
      const contentType = mimeTypes[extname] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Frontend JavaScript remains the same
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the default form submission

  // Handle form submission, such as sending an email or saving to a database
  alert('Thank you for your message!');

  // Reset the form
  this.reset();
});
