module.exports = {
    createTableUsers: `
        CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(150),
        username VARCHAR(150) UNIQUE,
        firstname VARCHAR(250),
        lastname VARCHAR(250),
        password VARCHAR(250),
        createdAt VARCHAR(100)
        )
    `,
    createUser: (id, username, firstname, lastname, password, createdAt) => `
       INSERT INTO users(id, username, firstname, lastname, password, createdAt)
       VALUES('${id}', '${username}', '${firstname}', '${lastname}', '${password}', '${createdAt}')
    `,
    getUser: (username) => `
       SELECT username, password FROM users WHERE username = '${username}'
    `,

    // conversation
    createTableRooms: `
       CREATE TABLE IF NOT EXISTS rooms(
           roomID VARCHAR(250) NOT NULL,
           userID VARCHAR(250),
           PRIMARY KEY (roomID)
       )
    `,

    createTableMessages: `
       CREATE TABLE IF NOT EXISTS messages(
           message VARCHAR(10000),
           roomID VARCHAR(250) NOT NULL,
           createdAt VARCHAR(100),
           updatedAt VARCHAR(100),
           FOREIGN KEY (roomID) REFERENCES rooms (roomID)
       )
    `,
    joinRoom: (userID, roomID) => `
       INSERT INTO rooms (roomID, userID)
       VALUES ('${roomID}', '${userID}')
    `
}
