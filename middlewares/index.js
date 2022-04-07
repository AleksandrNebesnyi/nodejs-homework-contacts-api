const authenticate = require('./authenticate');
const {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
} = require('./contactValidation');
const {
  registerLoginValidation,
  subscriptionValidation,
} = require('./userValidation');
const validate = require('./validation');
const upload = require('./upload');

module.exports = {
  authenticate,
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
  registerLoginValidation,
  subscriptionValidation,
  validate,
  upload,
};
