const http = require('http');
const path = require('path');
const fs = require('fs');

async function init() {
  const isFile = (fileName) => {
    return fs.lstatSync(fileName).isFile();
  };

  const backFolder = (directory) => {
    return directory.split('/').splice(1).slice(0, -1).join('/');
  };

  http
    .createServer((req, res) => {
      const fullPath = path.join(process.cwd(), req.url);

      if (!fs.existsSync(fullPath)) return res.end('File or directory not found');

      if (isFile(fullPath)) return fs.createReadStream(fullPath).pipe(res);

      let linksList = '';

      const prevUrl = backFolder(req.url);

      if (req.url.length > 1) {
        linksList = `<li><a href="/${prevUrl}">...back</a></li>`;
      }

      fs.readdirSync(fullPath).forEach((fileName) => {
        const filePath = path.join(req.url, fileName);
        linksList += `<li><a href="${filePath}">${fileName}</a></li>`;
      });

      const HTML = fs
        .readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
        .replace('##links', linksList);
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      return res.end(HTML);
    })
    .listen(5555);
}

init();
