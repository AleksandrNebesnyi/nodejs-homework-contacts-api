const { Schema, model } = require('mongoose');
const contactsSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minlengh: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contacts = model('contact', contactsSchema);
module.exports = Contacts;

// enum: ["sale", "stock", "promocode"], один из многих
// match: codeRegexp регулярное выражегие
