const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const isAuth = (req)=>{
    const token = req.headers['auth-token'];
     
    if(!token)
    throw new Error('u need to login');

    const {id} = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

    return id;
}

module.exports = {
    isAuth
}

