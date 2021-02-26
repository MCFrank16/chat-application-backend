require('dotenv').config();
const http = require('http');
const requestListener = require('../routes');
const routeExecutor = require('./routes');

const { initiateTables } = require('./config/db');
initiateTables();

const host = 'localhost';
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => routeExecutor(req, res));

server.listen(port, host, () => {
    console.log(`server is running on http://${host}:${port}`);
});
