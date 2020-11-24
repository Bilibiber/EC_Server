//Validation
const Joi = require('@hapi/joi');

//for register
const registerValidation = body => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(body);
};

const LogInValidation = body => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(body);
};
module.exports.registerValidation = registerValidation;
module.exports.LogInValidation = LogInValidation;
