const http = require('http');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const fullPath = path.join(__dirname, './index.html');

  const html = fs.readFileSync(fullPath, 'utf-8');

  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.write(html);

  res.end();
});

server.listen(port, () => {
  console.log('listening on *:3000');
});
