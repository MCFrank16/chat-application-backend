const url = require('url');
const { routes, paramsRoute } = require('./routes');

const routeExecutor = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');

    const { query, pathname } = url.parse(req.url, true);

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
    }

    if (routes[req.url] && req.method === routes[req.url].method) {
        (routes[req.url].execute)(req, res)
    } 
    else if (Object.keys(query).length > 0) {
        (paramsRoute[pathname].execute)(req, res)
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({error: 'Resource not found'}));
    }
};

module.exports = routeExecutor;
