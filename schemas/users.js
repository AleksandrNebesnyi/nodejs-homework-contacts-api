const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
// const gravatar = require('gravatar');
const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Please fill a valid email address',
      ],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      // default: function () {
      //   return gravatar.url(this.email, { s: '250' }, true);
      // },
    },
  },
  { versionKey: false, timestamps: true },
);
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
};
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
// userSchema.methods.createToken = function () {
//   const { SECRET_KEY } = process.env;
//   const payload = {
//     _id: this._id,
//   };
//   return jwt.sign(payload, SECRET_KEY);
// };
const User = model('user', userSchema);

module.exports = User;

// enum: ["sale", "stock", "promocode"], один из многих
// match: codeRegexp регулярное выражегие
