const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 3000;
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
    const fullPath = path.join(__dirname, './index.html');

    const html = fs.readFileSync(fullPath, 'utf-8');

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write(html);

    res.end();
});

const io = new Server(server);

let numberOfClients = 0;
let clients = {};

io.on('connection', (client) => {
    ++numberOfClients;

    client.on('newClientName', (name) => {
        clients = { ...clients, [client.id]: name };
        const clientNameOnline = Object.values(clients);
        client.broadcast.emit('number of clients', { numberOfClients, clientNameOnline });
        client.emit('number of clients', { numberOfClients, clientNameOnline });
    });

    client.on('disconnect', () => {
        --numberOfClients;
        const msg = {
            message: 'disconnected',
            name: clients[client.id],
        };
        client.broadcast.emit('server message', msg);
        delete clients[client.id];
        const clientNameOnline = Object.values(clients);
        client.broadcast.emit('number of clients', { numberOfClients, clientNameOnline });
    });

    client.on('chat message', (msg) => {
        client.broadcast.emit('server message', msg);
        client.emit('server message', msg);
    });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
