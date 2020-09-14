const router = require('express').Router();
const Exercise = require('../models/ExerciseModel');
const User = require('../models/UserModel');
const {isAuth} = require('../tokens/isAuth');
const {ExerciseValidation} = require('../Validation');

router.get('/exercises' , async (req, res)=>{
  
    try {
    const userid = isAuth(req);
  
    if(userid !== null){
        const exercises = await Exercise.find({user : userid});
        console.log(exercises)
        res.status(200).json(exercises);
    }
    } 
    catch (error) {
        res.send({
            error : error.message}
            );     
    }
});

router.get('/:id', async(req,res)=>{
    try{
    const userid = isAuth(req);
    if(userid !== null){
    const exercise = await Exercise.findById(req.params.id);
    const user = exercise.user;
    if(user!= userid)
    throw new Error('exercise does not belong to logged in user id')
    
    res.status(200).json(exercise);
   
    }
}

    catch(error){
        res.status(400).send({
            error : error.message
        });
    }
  
});

router.post('/create', async(req, res)=>{
    try{
    const userid = isAuth(req);
    if(userid !== null){
    const {error} = ExerciseValidation(req.body);
    if(error)
    {
    return res.status(400).send({
        error : error.details[0].message
    });
    }
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date;
    const user = userid;
    
    const newExercise = new Exercise({
        description : description,
        duration : duration,
        date : date,
        user : user
    });
    await newExercise.save();

    res.json(newExercise);
    }
    }
    catch(error){

        res.send({
            error : error.message
        });

    }
});


router.delete('/:id', async(req,res)=>{
    try{
    const userid = isAuth(req);
    if(userid !== null){
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    res.status(200).json(exercise);
    }
    }

    catch(error){
        res.send({
            error : error.message
        });
    }
  
});

router.post('/update/:id', async(req, res)=>{
    try{
    const userid = isAuth(req);
    if(userid !== null){
    const {error} = ExerciseValidation(req.body);
    if(error)
    {
    return res.status(400).send({
    error : error.details[0].message
     });
    }
    let exercise = await Exercise.findById(req.params.id);

    exercise.description = req.body.description;
    exercise.duration = req.body.duration;
    exercise.date = req.body.date;

    await exercise.save();

    res.json(exercise);
    }
    }
    catch(error){

        res.status(400).send(error);

    }
});

module.exports = router;