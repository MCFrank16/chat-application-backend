const { DB } = require('../config/db');
const { getAllConversations, createConversation } = require('../queries');
const { verifyToken } = require('../helpers/authenticate');
const getPostData = require('../helpers/getBodyData');

const getConversations = async (req, res) => {
    try {
        const { user: {id: userID }} = verifyToken(req.headers['authorization'].split(' ')[1]);
        if (!userID){
            res.writeHead(400);
            res.end(JSON.stringify({
                status: 400,
                message: 'provide the userID'
            }));
        }
        const conversations = await (await DB.query(getAllConversations(userID))).rows;

        console.log(conversations);

    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ status: 500, message: 'Internal Server Error' }));
    }
}


const createAconversation = async (req, res) => {
    try {
        const body = await getPostData(req);
        const { convoID, participants, lastMessage } = JSON.parse(body);
        await DB.query(createConversation(convoID, participants, lastMessage));

        res.writeHead(201);
        return res.end(JSON.stringify({
            status: 201,
            message: 'conversation created'
        }))
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ status: 500, message: 'Internal Server Error' }));
    }
}

module.exports = {
    getConversations,
    createAconversation
}
