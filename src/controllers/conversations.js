const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const { DB } = require('../config/db');
const { getAllConversations, createConversation, getUserDetails, getConversation } = require('../queries');
const { verifyToken } = require('../helpers/authenticate');
const getPostData = require('../helpers/getBodyData');

const getConversations = async (req, res) => {
    try {
        const { user: { id: userID } } = verifyToken(req.headers['authorization'].split(' ')[1]);
        if (!userID){
            res.writeHead(400);
            res.end(JSON.stringify({
                status: 400,
                message: 'provide the userID'
            }));
        }
        const { rows } = await (await DB.query(getUserDetails(userID)));
        
        const name = `${rows[0].firstname} ${rows[0].lastname}`

        const conversations = await (await DB.query(getAllConversations(name))).rows;

        res.writeHead(200);
        return res.end(JSON.stringify({
            status: 200,
            conversations
        }));

    } catch (error) {
        console.log(error)
        res.writeHead(500);
        return res.end(JSON.stringify({ status: 500, message: 'Internal Server Error' }));
    }
}


const createAconversation = async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const  { id } = verifyToken(token);
        const body = await getPostData(req);
        const { secondID } = JSON.parse(body);

        const createdAt = moment().format('ll');

        const first_participant= await (await DB.query(getUserDetails(id))).rows[0];
        const second_participant = await (await DB.query(getUserDetails(secondID))).rows[0];
        
        const participant_one = `${first_participant.firstname} ${first_participant.lastname}`;
        const participant_two = `${second_participant.firstname} ${second_participant.lastname}`;

        const { rows } = await DB.query(getConversation(participant_one, participant_two));
        
        if (rows.length > 0) {
            res.writeHead(200);
            res.end(JSON.stringify({ 
                status: 200,
                message: 'Conversation already created'
            }))
        } else {
            await DB.query(createConversation(uuidv4(), participant_one, participant_two, 'No message yet', createdAt));
            res.writeHead(201);
            return res.end(JSON.stringify({
                status: 201,
                message: 'conversation created'
            }));
        }
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ status: 500, message: 'Internal Server Error' }));
    }
}

module.exports = {
    getConversations,
    createAconversation
}
