const { io } = require('../server');

const { DB } = require('../config/db');
const { joinRoom } = require('../queries');

// Run when the user joins the conversation
io.on('connection', socket => {
    socket.on('joinConversation', async ({ userID, roomID }) => {
        const user = await DB.query(joinRoom(userID, roomID));
        

    });
});