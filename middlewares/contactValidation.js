// Мидлвар для валидации
const Joi = require('joi');
const validate = require('./validation');

// Схема валидации создания контакта
const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .required(),
});

// Схема валидации обновления контакта
const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org', 'ua', 'ru', 'gov'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .optional(),
}).min(1);

// Схема валидации обновления статуса контакта
const schemaUpdateContactStatus = Joi.object({
  favorite: Joi.boolean().required(),
});
// // Мидвар для обработки ошибок валидации
// const validate = (schema, res, req, next) => {
//   const validationLogs = schema.validate(req.body);

//   if (validationLogs.error) {
//     return res
//       .status(400)
//       .json({ message: validationLogs.error.message.replace(/"/g, '') });
//   }

//   next();
// };

module.exports = {
  addContactValidation: (req, res, next) => {
    return validate(schemaAddContact, res, req.body, next);
  },
  updateContactValidation: (req, res, next) => {
    return validate(schemaUpdateContact, res, req.body, next);
  },
  updateContactStatusValidation: (req, res, next) => {
    return validate(schemaUpdateContactStatus, req, res, next);
  },
};
