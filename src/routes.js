const { createUsername } = require('../src/controllers');

const routes = {
    '/': (req, res) => {
        res.writeHead(200);
        return res.end(JSON.stringify({
            status: 200,
            message: 'Welcome to the chat bot',
        }));
    },
    '/create/username': (req, res) => createUsername(req, res)
}

const routeExecutor = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (routes[req.url]) {
        return (routes[req.url])(req, res)
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({error: 'Resource not found'}));
    }
};

module.exports = routeExecutor;
