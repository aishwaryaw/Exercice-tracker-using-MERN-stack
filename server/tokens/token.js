const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const createAccessToken = (id)=>{

    return jwt.sign({id} , process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : '15m'
    });
}


const createRefreshToken = (id) =>{
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn : '7d'
    });
}

const sendAccessToken = (req, res,accesstoken)=>{
    return res.send({
        access_token : accesstoken, 
        email : req.body.username
    })
}

const sendRefreshToken = (res, refreshtoken)=>{
    return res.cookie('refreshtoken' , refreshtoken , {
        httpOnly : true,
        path : '/api/auth/refresh_token'
});
    
}


module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken
}


