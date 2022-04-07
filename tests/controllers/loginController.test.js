// 1. Написать unit-тесты для контроллера входа (login/signin)
// При помощи Jest

// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

const request = require('supertest');
const app = require('../../app');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// // const express = require('express');
// const { loginUser } = require('../../controllers/usersController');
// // app.post('/api/users/login', loginUser);
// // It's not serious...
// describe('test loginUserController', () => {
//   test('should return status:200 and token', async () => {
//     const user = {
//       _id: '1',
//       email: 'Arhangel9382973@gmail.com',
//       subscription: 'starter',
//       createdAt: new Date().getTime(),
//     };
//     const token = jwt.sign(
//       {
//         _id: user._id,
//         createdAt: user.createdAt,
//       },
//       process.env.SECRET_KEY,
//     );
//     const mReq = {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     };
//     const mRes = {
//       email: user.email,
//       subscription: user.subscription,
//     };
//     const mockNext = jest.fn();
//     loginUser(mReq, mRes, mockNext);
//     expect(mReq.token).toEqual(token);
//     expect(mReq.user._id).toEqual(user._id);
//     expect(mReq.user.createdAt).toEqual(user.createdAt);
//     expect(mockNext).toHaveBeenCalled();

//   });
// });
// It's not serious...
describe('PATCH avatar uploading', () => {
  it('should return not authorized without token', async () => {
    const response = await request(app)
      .patch('/api/users/avatars')
      .set('Authorization', '');

    expect(response.type).toBe('application/json');
    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch('Not authorized');
  });
});
