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

    getAllOnlineUsers: () => `
       SELECT firstname, lastname FROM users WHERE status = 'online'
    `,
    changeStatus: (id, status) => `
       UPDATE users SET status = '${status}' WHERE id = '${id}'
    `,
    // conversation
    createTableConversations: `
       CREATE TABLE IF NOT EXISTS conversations(
           convoID VARCHAR(250) NOT NULL,
           participant VARCHAR[],
           last_message VARCHAR(10000)
           PRIMARY KEY (convoID)
       )
    `,

    createConversation: (convoID, participants, lastMessage) => `
        INSERT INTO conversations (convoID, participant, last_message)
        VALUES ('${convoID}', '${participants}', '${lastMessage}')
    `,
    getAllConversations: (userID) => `
        SELECT * FROM conversations WHERE participants[1], participants[2] = '${userID}'
    `,
    getConversation: (convoID) => `
        SELECT convoID FROM conversations WHERE convoID = '${convoID}'
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
