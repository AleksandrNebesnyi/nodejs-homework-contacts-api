// Файл для подключения к базе данных
const mongoose = require('mongoose');
const app = require('../app');

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env;

// Подключение к базе
const db = async () => {
  return await mongoose
    .connect(DB_HOST, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => {
      app.listen(PORT);
      console.log('Database connection successful');
    })
    .catch(error => {
      console.error(`Database connection error: ${error.code}`);
      process.exit(1);
    });
};

// // Консолит подключение к базе
// mongoose.connection.on('connected', (_) => {
//   console.log('Database connection successful')
// })

// // Обработка ошибки при коннекте
// mongoose.connection.on('error', err => {
//   console.error(`Database connection error: ${err.code}`)
// })

// // Консолит отключение от базы
// mongoose.connection.on('disconnected', (_) => {
//   console.log('Database disconnected')
// })

// Отключение от базы при событии SIGINT (ctrl + C)
process.on('SIGINT', async () => {
  console.info(
    '\x1b[36m%s\x1b[0m',
    'Connection for DB disconnected and app terminated',
  );
  process.exit(1);
});

db();
