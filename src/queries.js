module.exports = {
    createTableUsers: `
        CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(150),
        username VARCHAR(150) UNIQUE,
        firstname VARCHAR(250),
        lastname VARCHAR(250),
        password VARCHAR(250),
        status VARCHAR(150),
        createdAt VARCHAR(100)
        )
    `,
    createUser: (id, username, firstname, lastname, password, status, createdAt) => `
       INSERT INTO users(id, username, firstname, lastname, password, status, createdAt)
       VALUES('${id}', '${username}', '${firstname}', '${lastname}', '${password}', '${status}', '${createdAt}')
    `,
    getUser: (username) => `
       SELECT id, username, password, firstname, lastname, status FROM users WHERE username = '${username}'
    `,

    getAllOnlineUsers: (id) => `
       SELECT id, firstname, lastname, username FROM users WHERE NOT id = '${id}' AND status = 'online'
    `,
    changeStatus: (id, status) => `
       UPDATE users SET status = '${status}' WHERE id = '${id}'
    `,
    getUserDetails: (id) => `
       SELECT firstname, lastname, username FROM users WHERE id = '${id}'
    `,
    // conversation
    createTableConversations: `
       CREATE TABLE IF NOT EXISTS conversations(
           convoID VARCHAR(250) NOT NULL,
           first_participant VARCHAR(250),
           second_participant VARCHAR(250),
           last_message VARCHAR(10000),
           createdAt VARCHAR(100),
           PRIMARY KEY (convoID)
       )
    `,
    createConversation: (convoID, first_participant, second_participant, lastMessage, createdAt) => `
        INSERT INTO conversations (convoID, first_participant, second_participant, last_message, createdAt)
        VALUES ('${convoID}', '${first_participant}', '${second_participant}', '${lastMessage}', '${createdAt}')
    `,
    getAllConversations: (userID) => `
        SELECT * FROM conversations WHERE first_participant = '${userID}' OR second_participant = '${userID}'
    `,
    getConversation: (first_participant, second_participant) => `
        SELECT convoID FROM conversations WHERE first_participant = '${first_participant}' AND second_participant = '${second_participant}'
    `,
    createTableMessages: `
       CREATE TABLE IF NOT EXISTS messages(
           messageID VARCHAR(250),
           message VARCHAR(10000),
           senderID VARCHAR(250),
           receiverID VARCHAR(250),
           status VARCHAR(200),
           createdAt VARCHAR(100),
           updatedAt VARCHAR(100),
           PRIMARY KEY (messageID)
       )
    `,
    sendMessage: (messageID, message, senderID, receiverID, status, createdAt, updatedAt) => `
       INSERT INTO messages (messageID, message, senderID, receiverID, status, createdAt, updatedAt)
       VALUES ('${messageID}', '${message}', '${senderID}', '${receiverID}', '${status}', '${createdAt}', '${updatedAt}')
    `
}
