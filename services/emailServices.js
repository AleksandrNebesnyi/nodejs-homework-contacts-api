// Отправка письма через Sendgrid
const User = require('../schemas/users');
const sendEmail = require('../helpers/sendEmail');

const verify = async verificationToken => {
  const user = await User.findOne({ verificationToken });
  if (user) {
    await User.findByIdAndUpdate(user._id, {
      verifyToken: null,
      verify: true,
    });
    return true;
  }
};

// Повторно верифицирует юзера
const resendVerify = async email => {
  const user = await User.findOne({ email, verify: false });

  if (user) {
    const data = {
      to: email,
      subject: 'Підтвердження реєстрації на сайті',
      html: `
    <h1>Дякуємо за реєстрацію!</h1>
    <p>
      Ваш логін: ${email}
    </p>
    
    <a href="http://localhost:4000//api/users/verify/${user.verificationToken}" target="_blank">Для підтвердження реєстрації перейдіть за посиланням</a>
    `,
    };
    await sendEmail(data);
    return true;
  }
};
module.exports = { verify, resendVerify };
