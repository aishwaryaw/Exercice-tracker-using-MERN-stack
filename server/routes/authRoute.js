const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createAccessToken , createRefreshToken , sendAccessToken  , sendRefreshToken} = require('../tokens/token');
const { UserValidation } = require('../Validation');
const {isAuth} = require('../tokens/isAuth');

router.get('/isAuth' , async(req, res)=>{
    try {
    const userid = isAuth(req);
  
    if(userid !== null){
        res.send({
            status : 'True'
        });
    }
    }
    catch (error) {
        res.send({
            error : error.message
            });     
    }
});


router.post('/register', async(req, res)=>{

    const user = req.body;

    const {error} = UserValidation(user);
    if(error)
    {
    return res.status(400).send({
        error : error.details[0].message
    });
    }
  
    try {

    if(await User.findOne({username : user.username})){
        throw new Error('usernam already exists');
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        username : req.body.username,
        password : hashedPassword,
        refresh_token:''
    });

  
    await newUser.save();
    res.status(200).send(newUser);

    } catch (error) {

        res.status(400).send({
            error : `${error.message}`
        });
    }
 
});

router.post('/login', async (req,res)=>{

    // const {error} = UserValidation(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    // 1. Find user in array. If not exist send error
    try{
    const email = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    let user = await User.findOne({username : email});
    
    if(!user)
    {
        throw new Error('u need to register');
    }

    //2. dehash password and check , Compare crypted password and see if it checks out. Send error if not
    const validPassword = await bcrypt.compare(password, user.password);

    if( !validPassword){
         throw new Error('ur password or username is incorrect');
    }

    // 3. Create Refresh- and Accesstoken
    const access_token = createAccessToken(user._id);
    const refresh_token = createRefreshToken(user._id);

    //console.log(res.Cookies);
    // 4. Store Refreshtoken with user in "db"
    
    user.refresh_token = refresh_token;
    const newuser = await user.save();

    // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
    //sendAccessToken(req, res, access_token);
    sendRefreshToken(res, refresh_token);
    sendAccessToken(req, res, access_token);
  

    }

    catch(error){
        res.send({
           error: `${error.message}`
        });
    }

});


router.post('/logout', (req, res)=>{
    res.clearCookie('refreshtoken', { path:'/api/auth/refresh_token' });
    res.send('u have been logged out');
})

router.get('/users', async(req, res)=>{

  try {
    User.find()
    .then(users => res.json(users));
        
    } 
    catch (error) {

        res.status(400).send(error);
        
    }

});

router.get('/:id', async(req, res)=>{
    try {

    const user = await User.findById(req.params.id);
    res.status(200).json(user);
        
    } catch (error) {
        res.status(400).send(error);
        
    }
   
})


//Get a new access token with a refresh token
router.post('/refresh_token', async(req,res)=>{
    
    const token = req.cookies.refreshtoken;
    console.log(req.cookies.refreshtoken)
     // If we don't have a token in our request
    if(!token){
        return res.send({access_token:''});
    }

    // We have a token, let's verify it!
    let payload = null;

    try {
        payload = jwt.verify(token , process.env.REFRESH_TOKEN_SECRET)
        
    } catch (error) {
        return res.send({access_token:''});
    }

    // token is valid, check if user exist
    let user = await User.findById(payload.id);
    

    if(!user){
        return res.send({access_token : ''});
    }

     // user exist, check if refreshtoken exist on user
    if(user.refresh_token !== token){
        
        return res.send({access_token:'match'});
    }

    // console.log(user.refresh_token)
    //     console.log(token)
    // token exist, create new Refresh- and accesstoken
    const access_token = createAccessToken(user._id);
    const refresh_token = createRefreshToken(user._id);

    user.refresh_token = refresh_token;
    await user.save();

     //Send token. Refreshtoken as a cookie and accesstoken as a regular response

    // All good to go, send new refreshtoken and accesstoken
    sendRefreshToken(res, refresh_token);

    return res.send({access_token});



})
module.exports = router;