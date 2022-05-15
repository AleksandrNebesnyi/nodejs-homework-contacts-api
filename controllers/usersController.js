// Контроллеры - логика обработки маршрутов

// Импорт функций для работы с  БД
const {
  findUserById,
  findUserByEmail,
  createUser,
  updateSubscription,
} = require('../services/usersServices');
const { login, logout } = require('../services/authServices');
// Регистрация юзера
const registerUser = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    return res.status(409).json({ message: 'Email in use' });
  }

  const { email, subscription } = await createUser(req.body);
  res.status(201).json({ user: { email, subscription } });
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
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscriptionUser,
};
