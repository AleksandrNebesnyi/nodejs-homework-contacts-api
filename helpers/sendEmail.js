const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: 'a.nebesnyi@Gmail.com' };
  sgMail.send(email);
};

module.exports = sendEmail;
