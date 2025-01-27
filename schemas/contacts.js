const { Schema, model, SchemaTypes } = require('mongoose');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      min: [3, 'Too short name'],
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const Contact = model('contact', contactSchema);
module.exports = Contact;

// enum: ["sale", "stock", "promocode"], один из многих
// match: codeRegexp регулярное выражегие
