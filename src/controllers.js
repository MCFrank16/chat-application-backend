const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const { DB } = require('./config/db');
const { createUser } = require('./queries');
const { getPostData } = require('../src/utils');

const createUsername = async (req, res) => {    
    try {

        const body = await getPostData(req);

        const { username } = JSON.parse(body);
        const id = uuidv4();
        const createdAt = moment().format('h:mm a');

        await DB.query(createUser(id, username, createdAt));

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

module.exports = {
    createUsername
}