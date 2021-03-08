require('dotenv').config();
const socketio = require('socket.io');
const http = require('http');
const url = require('url');
const routeExecutor = require('./routeExecutor');

const { initiateTables } = require('./config/db');
initiateTables();

const socketConnection = require('./controllers/socket');

const host = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
    return routeExecutor(req, res)
});

const io = socketio(server, {
    cors: {
        origin: '*'
    }
});
// io.on('connection', socket => {
//     console.log(socket.id)

//     socket.on('disconnection', () => {
//         console.log('user has left!!!')
//     })
// })
// socketConnection(io);

server.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
});

module.exports = server
