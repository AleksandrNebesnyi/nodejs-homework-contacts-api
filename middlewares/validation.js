// Мидлвар для обработки ошибок валидации body
const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body);

  if (validationBody.error) {
    return res
      .status(400)
      .json({ message: validationBody.error.message.replace(/"/g, '') });
  }
  next();
};

module.exports = validate;