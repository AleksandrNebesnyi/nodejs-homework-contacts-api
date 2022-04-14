// Отправка письма через Sendgrid
const User = require('../schemas/users');
const { sendEmail } = require('../helpers/sendEmail');

const verify = async verifyToken => {
  const user = await User.findOne({ verifyToken });
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
    <p>
      Ваш пароль: *********
    </p>
    <p>
      Для підтвердження реєстрації перейдіть за посиланням:
    </p>
    <<a href="http://localhost:3000/api/auth/users/verify/${user.verify}" target="_blank">
    `,
    };
    await sendEmail(data);
    return true;
  }
};
module.exports = { verify, resendVerify };
