const jwt = require('jsonwebtoken');
require('dotenv').config();
// check if token is valid
function authenticateToken(req, res, next) {
    console.log(`process.env.SECRET_KEY: ${process.env.SECRET_KEY}`);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(token);

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        console.log(token);
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

// create token
function createToken(user) {
    const payload = {
        sub: user._id,
        iat: Math.floor(Date.now() / 1000),
        iss: process.env.SERVER_URL
    }

    return jwt.sign(payload, process.env.SECRET_KEY);

}

module.exports = {
    authenticateToken,
    createToken
}