require('dotenv').config();
const socketio = require('socket.io');
const http = require('http');
const routeExecutor = require('./routeExecutor');

const { initiateTables } = require('./config/db');
initiateTables();

const host = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => routeExecutor(req, res));
const io = socketio(server);

server.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
});

module.exports = {
    server,
    io,
};
