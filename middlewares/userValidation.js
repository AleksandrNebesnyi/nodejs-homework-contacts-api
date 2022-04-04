// Мидлвар для валидации
const Joi = require('joi');
const validate = require('./validation');

// const SubTypes = {
//   STARTER: 'starter',
//   PRO: 'pro',
//   BUSINESS: 'business',
// };

// Схема валидации регистрации и логина юзера
const schemaRegLogUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov', 'ca'] },
    })
    .pattern(
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    )
    .required(),
  password: Joi.string()
    .pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)
    .required(),
  subscription: Joi.string().default('starter'),
});

// Схема валидации обновления подписки
const schemaSubscriptionUser = Joi.object({
  subscription: Joi.any().valid('starter', 'pro', 'business').required(),
});

// // Мидлвар для обработки ошибок валидации body
// const validate = (schema, res, req, next) => {
//   const validationBody = schema.validate(req.body);

//   if (validationBody.error) {
//     return res
//       .status(400)
//       .json({ message: validationBody.error.message.replace(/"/g, '') });
//   }
//   next();
// };

module.exports = {
  registerLoginValidation: (req, res, next) => {
    return validate(schemaRegLogUser, res, req, next);
  },
  subscriptionValidation: (req, res, next) => {
    return validate(schemaSubscriptionUser, res, req, next);
  },
};
