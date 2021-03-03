require('dotenv').config();
const crypto = require('crypto');
const { verify, sign } = require('jsonwebtoken');

const encrypt = (data) => {
    return crypto.createHmac('sha256', process.env.PRIVATEKEY)
       .update(data)
       .digest('hex');
}

const verifyPassword = (hashed, plain) => hashed === encrypt(plain);

const signToken = (payload, expiresIn) => {
    return sign(payload, process.env.PRIVATEKEY, { expiresIn });
}

const verifyToken = (token) => {
    try {
        return verify(token, process.env.PRIVATEKEY);
    } catch (err) {
        return false;
    }
}

module.exports = {
    encrypt,
    verifyPassword,
    signToken,
    verifyToken
}