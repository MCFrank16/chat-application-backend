require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const getPostData = require('../helpers/getBodyData');
const { encrypt, verifyToken } = require('../helpers/authenticate');
const createConversation = require('../helpers/createConvo');

const { DB } = require('../config/db');
const { sendMessage } = require('../queries');


const createMessage = async (req, res) => {

    try {
        const body = await getPostData(req);
        const token = req.headers['authorization'].split(' ')[1];
        const { user: { id: senderID } } = verifyToken(token);

        const { text, receiverID, convoID } = JSON.parse(body);
        
        if (!text) {
            res.writeHead(201);
            return res.end(JSON.stringify({
                status: 400,
                message: 'type in a message'
            }));
        }

        const messageID = uuidv4();
        const encryptedMessage = encrypt(text);
        const createdAt = moment().format('h:mm a');
        const updatedAt = moment().format('h:mm a');

        const data = {
            messageID,
            text,
            senderID,
            receiverID,
            createdAt,
            status: 'sent'
        }

        const result = createConversation(convoID);

        await DB.query(sendMessage(
            messageID, 
            encryptedMessage, 
            senderID, 
            receiverID, 
            'sent', 
            createdAt, 
            updatedAt
        ));

        res.writeHead(201);
        return res.end(JSON.stringify({
            status: 201,
            data
        }));
        
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({
            status: 500,
            message: 'Internal server error'
        }))
    }

}

module.exports = {
    createMessage
}