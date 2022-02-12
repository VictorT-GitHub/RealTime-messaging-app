import Joi from "joi";

// REGISTER (User-Model)
const userCheck = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    birthday: Joi.date(),
    motto: Joi.string(),
  });

  return schema.validate(data);
};

// Edit user (User-Model)
const modifyUserCheck = (data) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    birthday: Joi.date(),
    motto: Joi.string(),
  });

  return schema.validate(data);
};

// LOGIN (User-Model)
const loginCheck = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

// PUT new message (Conv-Model subdocs "messages")
const messageCheck = (data) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });

  return schema.validate(data);
};

export default { userCheck, modifyUserCheck, loginCheck, messageCheck };
