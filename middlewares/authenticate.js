const jwt = require('jsonwebtoken'); // библиотека для создания токенов
const { SECRET_KEY } = process.env;
const User = require('../services/usersServices');

/*
1. Извлекает заголовок authorization.
2. Превращает строку в массив по пробелу.
3. Проверяем, является ли первое слово "Bearer".
4. Проверяет токен на валидность (мы ли ео выдали).
5. Находим в базе пользователя по id из токена.
6. Прикрепляем его к запросу (объект req).
7. Передаем обработку запроса дальше. 
*/

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ');
    console.log(req.headers.authorization);
    if (bearer !== 'Bearer') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findUserById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (!user.token) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
