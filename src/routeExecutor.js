const routes = require('./routes');

const routeExecutor = (req, res) => {
    res.setHeader(
        "Content-Type", "application/json",
        "Access-Control-Allow-Origin", "*",
        "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH",
    );
    if (routes[req.url] && req.method === routes[req.url].method) {
        return (routes[req.url].execute)(req, res)
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({error: 'Resource not found'}));
    }
};

module.exports = routeExecutor;
