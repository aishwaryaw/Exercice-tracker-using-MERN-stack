const Joi = require('@hapi/joi');

const UserValidation = (data) => {
    const schema = Joi.object({
    username : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required()
    });

    return schema.validate(data);
}

const ExerciseValidation = (data) => {
    const schema = Joi.object({
    description : Joi.string().min(6).required(),
    duration : Joi.number().min(2).required(),
    date :Joi.date().required()
    });

    return schema.validate(data);
}


module.exports = {
    UserValidation,
    ExerciseValidation
}