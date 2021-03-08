const { createUsername, loginUser, logout, onlineUsers, getDetails } = require('./controllers/users');
const { createMessage } = require('./controllers/messages');
const { createAconversation, getConversations } = require('./controllers/conversations');

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
    },
    '/create/conversation': {
        method: 'POST',
        execute: (req, res) => createAconversation(req, res)
    },
    '/all/conversations': {
        method: 'GET',
        execute: (req, res) => getConversations(req, res)
    }
}

const paramsRoute = {
    '/get/details': {
        method: 'GET',
        execute: (req, res) => getDetails(req, res)
    }
}

module.exports = {
    routes,
    paramsRoute,
};
