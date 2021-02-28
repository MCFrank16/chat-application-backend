module.exports = {
    createTableUsers: `
        CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(150),
        username VARCHAR(150) UNIQUE,
        password VARCHAR(250),
        createdAt VARCHAR(100)
        )
    `,
    createUser: (id, username, password, createdAt) => `
       INSERT INTO users(id, username, password, createdAt)
       VALUES('${id}', '${username}', '${password}', '${createdAt}')
    `,
    getUser: (username) => `
       SELECT username, password FROM users WHERE username = '${username}'
    `
}
