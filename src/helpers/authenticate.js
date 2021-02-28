require('dotenv').config();
const crypto = require('crypto');
const { verify, sign } = require('jsonwebtoken');

const hashPassword = (data) => {
    return crypto.createHmac('sha256', process.env.PRIVATEKEY)
       .update(data)
       .digest('hex');
}

const verifyPassword = (hashed, plain) => hashed === hashPassword(plain);

const signToken = (payload, expiresIn) => {
    return sign(payload, process.env.PRIVATEKEY, { expiresIn });
}

const verifyToken = (token) => {
    try {
        verify(token, process.env.PUBLICKEY, { algorithms: ['RS256']});
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
    signToken,
    verifyToken
}