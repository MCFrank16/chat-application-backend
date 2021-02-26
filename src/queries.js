module.exports = {
    createTableUsers: `
        CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(150),
        username VARCHAR(150) UNIQUE,
        createdAt VARCHAR(100)
        )
    `,
    createUser: (id, username, createdAt) => `
       INSERT INTO users(id, username, createdAt)
       VALUES('${id}', '${username}', '${createdAt}')
    `
}
