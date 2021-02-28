const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const { DB } = require('../config/db');
const { createUser, getUser } = require('../queries');
const getPostData = require('../helpers/getBodyData');
const { hashPassword, signToken, verifyPassword } = require('../helpers/authenticate');

const createUsername = async (req, res) => { 
    try {

        const body = await getPostData(req);
        const { username, password } = JSON.parse(body);

        if (!username || !password) {
            res.writeHead(400)
            return res.end()
        }

        const id = uuidv4();
        const createdAt = moment().format('h:mm a');
        const hashedPassword = hashPassword(password);

        await DB.query(createUser(id, username, hashedPassword, createdAt));

        res.writeHead(201);
        return res.end(JSON.stringify({
            status: 201,
            message: 'user created',
        }))
    } catch (error) {
        res.writeHead(400);
        return res.end(JSON.stringify({
            status: 400,
            message: error.detail
        }))
    }
}

const loginUser = async (req, res) => {

    try {
        const body = await getPostData(req);
        const { username, password } = JSON.parse(body);

        if (!username || !password) {
            res.writeHead(400)
            return res.end()
        }
    
        const user = await (await DB.query(getUser(username))).rows[0];
        const token = await signToken({ user: user.username }, '24h');

        if (!verifyPassword(user.password, password)) {
            res.writeHead(401);
            return res.end('check the password')
        }

        res.writeHead(200);
        return res.end(JSON.stringify({
            status: 200,
            token: token,
        }));
    
    } catch (error) {
        res.writeHead(401)
        return res.end(JSON.stringify({
            status: 401,
            message: 'Username do not exist'
        }))
    }
}

module.exports = {
    createUsername,
    loginUser,
}