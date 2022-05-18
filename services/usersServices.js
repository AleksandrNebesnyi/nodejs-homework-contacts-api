const User = require('../schemas/users');

// Создает нового юзера в базе
const createUser = async (body, avatarURL) => {
  const user = await new User({ ...body, avatarURL });
  user.setPassword(body.password);
  return user.save();
};

// Находит юзера в базе по id
const findUserById = async id => {
  const user = await User.findById(id);
  return user;
};

// Находит юзера в базе по email
const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

// Обновляет токен юзера
const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token });
};

// Обновляет подписку юзера
const updateSubscription = async (id, subscription) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { subscription },
    { new: true },
  );
  return user;
};

// Обновляет аватар юзера
const updateAvatar = async (id, url) => {
  const avatarURL = await User.findOneAndUpdate(
    { _id: id },
    { avatarURL: url },
    { new: true },
  );
  console.log(avatarURL);
  return avatarURL;
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar,
};
