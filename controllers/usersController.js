// Контроллеры - логика обработки маршрутов
const fs = require('fs').promises;
const path = require('path');
const gravatar = require('gravatar');

// Импорт функций для работы с  БД
const {
  findUserById,
  findUserByEmail,
  createUser,
  updateSubscription,
  updateAvatar,
} = require('../services/usersServices');
const { login, logout } = require('../services/authServices');
const { editAvatar } = require('../helpers/editAvatar');
const { verify, resendVerify } = require('../services/emailServices');
// Регистрация юзера
const registerUser = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);

  if (user) {
    return res.status(409).json({ message: 'Email in use' });
  }
  const avatarURL = gravatar.url(email);

  const result = await createUser(req.body, avatarURL);
  res.status(201).json({ result });
};

//  Вход юзера
const loginUser = async (req, res) => {
  const token = await login(req.body);

  if (token) {
    const { email, subscription } = await findUserByEmail(req.body.email);
    return res.status(200).json({ token, user: { email, subscription } });
  }

  res.status(401).json({ message: 'Email or password is wrong' });
};
// Выход юзера
const logoutUser = async (req, res) => {
  const { id } = req.user;
  await logout(id);
  res.status(204).json({ message: 'No Content' });
};

// Текущий юзер
const currentUser = async (req, res) => {
  const currentUser = await findUserById(req.user.id);

  if (currentUser) {
    const { email, subscription } = currentUser;
    res.status(200).json({ email, subscription });
  }
};
//  Обновление подписки юзера
const updateSubscriptionUser = async (req, res) => {
  const result = await updateSubscription(req.user.id, req.body.subscription);

  if (result) {
    const { email, subscription } = result;
    res.status(200).json({ user: { email, subscription }, status: 'updated' });
  }
};

// Контроллер аватара юзера
const uploadAvatarUser = async (req, res) => {
  const filePath = req.file.path;

  const fileName = req.file.filename;
  const userId = req.user._id;
  const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

  if (req.file) {
    await editAvatar(filePath); // Обрабатывает картинку

    const newFileName = `${userId}_${fileName}`;

    const resultUpload = path.join(avatarsDir, newFileName);

    await fs.rename(filePath, resultUpload); // Переносит картинку в папку с аватарами

    const newAvatarUrl = path.join('avatars', newFileName); // Ссылка на новый аватар

    const url = await updateAvatar(userId, newAvatarUrl);

    return res.status(200).json({ avatarURL: url });
  }

  res
    .status(400)
    .json({ message: 'Please, provide valid file [jpeg, png, jpg]' });
  await fs.unlink(filePath);
};

// Контроллер верификации юзера
const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  const result = await verify(verificationToken);

  if (result) {
    return res.status(200).json({ message: 'Verification successful' });
  }

  res.status(404).json({ message: 'User not found' });
};

// Контроллер повторной верификации юзера
const resendVerifyUser = async (req, res) => {
  const result = await resendVerify(req.body.email);

  if (result) {
    return res.status(200).json({ message: 'Verification email sent' });
  }

  res.status(400).json({ message: 'Verification has already been passed' });
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscriptionUser,
  uploadAvatarUser,
  verifyUser,
  resendVerifyUser,
};
