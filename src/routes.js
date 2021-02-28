const { createUsername, loginUser } = require('./controllers/users');

const routes = {
    '/': (req, res) => {
        res.writeHead(200);
        return res.end(JSON.stringify({
            status: 200,
            message: 'Welcome to the chat bot',
        }));
    },
    '/create/user': {
        method: 'POST',
        execute: (req, res) => createUsername(req, res)
    },
    '/login/user': {
        method: 'POST',
        execute: (req, res) => loginUser(req, res)
    }
}

module.exports = routes;
