const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const { DB } = require('../config/db');
const { getAllConversations, createConversation, getUserDetails, getConversation } = require('../queries');
const { verifyToken } = require('../helpers/authenticate');
const getPostData = require('../helpers/getBodyData');

const getConversations = async (req, res) => {
    try {
        const { user: { username } } = verifyToken(req.headers['authorization'].split(' ')[1]);
        if (!username){
            res.writeHead(400);
            return res.end(JSON.stringify({
                status: 400,
                message: 'provide the userID'
            }));
        }

        const conversations = await (await DB.query(getAllConversations(username))).rows;

        res.writeHead(200);
        return res.end(JSON.stringify({
            status: 200,
            conversations
        }));

    } catch (error) {
        res.writeHead(500);
        return res.end(JSON.stringify({ status: 500, message: 'Internal Server Error' }));
    }
}


const createAconversation = async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const { user: { username } } = verifyToken(token);

        const body = await getPostData(req);
        const { secondName } = JSON.parse(body);

        const createdAt = moment().format('ll');

        const { rows } = await DB.query(getConversation(username, secondName));
        
        if (rows.length > 0) {
            res.writeHead(200);
            return res.end(JSON.stringify({ 
                status: 200,
                message: 'Conversation already created'
            }))
        } else {
            await DB.query(createConversation(uuidv4(), username, secondName, 'No message yet', createdAt));
            res.writeHead(201);
            return res.end(JSON.stringify({
                status: 201,
                message: 'conversation created'
            }));
        }
    } catch (error) {
        console.log(error)
        res.writeHead(500);
        return res.end(JSON.stringify({ status: 500, message: 'Internal Server Error' }));
    }
}

module.exports = {
    getConversations,
    createAconversation
}
