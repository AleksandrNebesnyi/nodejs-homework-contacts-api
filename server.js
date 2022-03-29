const mongoose = require('mongoose');
const app = require('./app');
const process = require('process');

const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// Подключение к bd

mongoose
  .connect(DB_HOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log('Database connection successful');
    }),
  )
  .catch(error => {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  });

// // Консолит подключение к базе
// mongoose.connection.on('connected', (_) => {
//   console.log('Database connection successful')
// })

// // Обработка ошибки при коннекте
// mongoose.connection.on('error', err => {
//   console.error(`Database connection error: ${err.code}`)
// })

// Консолит отключение от базы
mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});

// Отключение от базы при событии SIGINT (ctrl + C)
process.on('SIGINT', () => {
  console.info(
    '\x1b[36m%s\x1b[0m',
    'Connection for DB disconnected and app terminated',
  );
  process.exit(1);
});
