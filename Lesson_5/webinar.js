const http = require('http');
const url = require('url');
const cluster = require('cluster');
const os = require('os');
const path = require('path');
const fs = require('fs');

if (cluster.isMaster) {
  console.log(`Master is running ${process.pid}`);
  for (let i = 0; i < os.cpus().length; i++) {
    console.log(`Forking process number ${i}`);
    cluster.fork();
  }
} else {
  const filePath = path.join(__dirname, './index.html');
  const readStream = fs.createReadStream(filePath);

  const server = http.createServer((req, res) => {
    console.log(`Worker ${process.pid} handler request`);
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    readStream.pipe(res);
  });

  console.log(`Worker ${process.pid} is runnign`);
  server.listen(5555);
}
