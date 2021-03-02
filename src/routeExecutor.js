const routes = require('./routes');

const routeExecutor = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS GET POST PUT PATCH DELETE');
    
    if (routes[req.url] && req.method === routes[req.url].method) {
        return (routes[req.url].execute)(req, res)
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({error: 'Resource not found'}));
    }
};

module.exports = routeExecutor;
