const { Client } = require('pg');
const { connectionString } = require('./index');

const { createTableUsers, createTableMessages, createTableConversations } = require('../queries');

const DB = new Client({ connectionString, });

const initiateTables = async () => {
    try {
        DB.connect();
        await DB.query(createTableUsers);
        await DB.query(createTableMessages);
        await DB.query(createTableConversations);
    } catch (error) {
        console.debug(error)
    }
};

module.exports = {
    DB,
    initiateTables,
};
