const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const { DB } = require('../config/db');
const { createUser, getUser } = require('../queries');
const getPostData = require('../helpers/getBodyData');
const { hashPassword, signToken, verifyPassword } = require('../helpers/authenticate');

const createUsername = async (req, res) => { 
    try {

        const body = await getPostData(req);
        const { firstname, lastname, username, password } = JSON.parse(body);

        if (!firstname || !lastname || !username || !password) {
            res.writeHead(400)
            return res.end(JSON.stringify({
                status: 400,
                message: 'Empty body is not allowed'
            }))
        }

        const id = uuidv4();
        const createdAt = moment().format('h:mm a');
        const hashedPassword = hashPassword(password);

        await DB.query(createUser(id, username, firstname, lastname, hashedPassword, createdAt));
        const token = await signToken({ username, firstname, lastname }, '24h');

        res.writeHead(201);
        return res.end(JSON.stringify({
            status: 201,
            message: 'user created',
            token
        }))

    } catch (error) {
        res.writeHead(500);
        return res.end(JSON.stringify({
            status: 500,
            message: 'Internal server error'
        }))
    }
}

const loginUser = async (req, res) => {

    try {
        const body = await getPostData(req);
        const { username, password } = JSON.parse(body);

        if (!username || !password) {
            res.writeHead(400)
            return res.end(JSON.stringify({
                status: 400,
                message: 'Empty body is not allowed'
            }))
        }
    
        const user = await (await DB.query(getUser(username))).rows[0];
    
        if (user === undefined || !verifyPassword(user.password, password)) {
            res.writeHead(401);
            return res.end(JSON.stringify({
                status: 401,
                message: 'Unexisting data'
            }))
        }

        delete user.password
        const token = await signToken({ user }, '24h');

        res.writeHead(200);
        return res.end(JSON.stringify({
            status: 200,
            token,
        }));
    
    } catch (error) {
        res.writeHead(500)
        return res.end(JSON.stringify({
            status: 500,
            message: 'Internal server error'
        }))
    }
}

module.exports = {
    createUsername,
    loginUser,
}
