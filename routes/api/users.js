const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../../helpers/asyncWrapper'); // Мидлвар универсального обработчика try catch
const {
  registerLoginValidation,
  subscriptionValidation,
  resendVerifyUserValidation,
} = require('../../middlewares/userValidation');
const authenticate = require('../../middlewares/authenticate');
const upload = require('../../middlewares/upload');

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscriptionUser,
  uploadAvatarUser,
  verifyUser,
  resendVerifyUser,
} = require('../../controllers/usersController'); // Контроллеры маршрутов

router.post('/signup', registerLoginValidation, asyncWrapper(registerUser)); // Роут для регистрации юзера
router.post('/login', registerLoginValidation, asyncWrapper(loginUser)); // Роут для входа юзера
router.post('/logout', authenticate, asyncWrapper(logoutUser)); // Роут для выхода
router.get('/current', authenticate, asyncWrapper(currentUser)); // Роут для текущего юзера
router.patch(
  '/subscription',
  authenticate,
  subscriptionValidation,
  asyncWrapper(updateSubscriptionUser),
); // Роут для обновления статуса
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  asyncWrapper(uploadAvatarUser),
); // Обновление аватара
router.get('/verify/:verificationToken', asyncWrapper(verifyUser)); // Верификация юзера
router.post(
  '/verify/',
  resendVerifyUserValidation,
  asyncWrapper(resendVerifyUser),
); // Запрос повторной верификации юзера
module.exports = router;