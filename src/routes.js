const { createUsername, loginUser, logout, onlineUsers } = require('./controllers/users');
const { createMessage } = require('./controllers/messages');

const routes = {
    '/': {
        method: 'GET',
        execute: (req, res) => {
            res.writeHead(200);
            return res.end(JSON.stringify({
                status: 200,
                message: 'Welcome to the chat bot',
            }));
        } 
    },
    '/create/user': {
        method: 'POST',
        execute: (req, res) => createUsername(req, res)
    },
    '/login/user': {
        method: 'POST',
        execute: (req, res) => loginUser(req, res)
    },
    '/logout': {
        method: 'GET',
        execute: (req, res) => logout(req, res)
    },
    '/online/users': {
        method: 'GET',
        execute: (req, res) => onlineUsers(req, res)
    },
    '/create/message': {
        method: 'POST',
        execute: (req, res) => createMessage(req, res)
    }
}

module.exports = routes;
