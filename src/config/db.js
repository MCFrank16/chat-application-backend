const { Client } = require('pg');
const { connectionString } = require('./index');

const { createTableUsers } = require('../queries');

const DB = new Client({ connectionString, });

const initiateTables = async () => {
    try {
        DB.connect();
        await DB.query(createTableUsers);
    } catch (error) {
        console.debug(error)
    }
};

module.exports = {
    DB,
    initiateTables,
};
