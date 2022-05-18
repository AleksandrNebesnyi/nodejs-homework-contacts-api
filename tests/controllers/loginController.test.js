// 1. Написать unit-тесты для контроллера входа (login/signin)
// При помощи Jest

// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const User = require('../../schemas/users');
require('dotenv').config();
const { DB_HOST } = process.env;

describe('test auth', () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach(done => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  afterEach(done => {
    mongoose.connection.close(() => done());
  });

  test('test register route', async () => {
    // const newUser = {
    //   email: 'bogdan@gmail.com',
    //   password: '123456',
    // };

    // const user = await User.create(newUser);

    /*
        1. Проверить правильность получаемого ответа на 
        AJAX-запрос документации
        2. Проверить что в базу записался нужный элемент.
        */

    const loginUser = {
      email: 'a.nebesnyi@gmail.com',
      password: 'Arhangel9382973',
    };

    // check data in database

    const response = await request(app)
      .post('/api/users/login')
      .send(loginUser);
    expect(response.statusCode).toBe(200); // status 200
    console.log(response.body.token);
    const { body } = response;
    const { email } = body.user;
    const { subscription } = body.user;

    expect(subscription).toBe('starter');
    expect(body.token).toBeTruthy(); // create token is Ok
    const { token } = await User.findOne({ email });
    expect(body.token).toBe(token); // tokens match
  });
});
// ------------------------------------------
//  not serious...
// describe('PATCH avatar uploading', () => {
//   it('should return not authorized without token', async () => {
//     const response = await request(app)
//       .patch('/api/users/avatars')
//       .set('Authorization', '');

//     expect(response.type).toBe('application/json');
//     expect(response.statusCode).toEqual(401);
//     expect(response.body).toBeDefined();
//     expect(response.body.message).toBeDefined();
//     expect(response.body.message).toMatch('Not authorized');
//   });
// });
