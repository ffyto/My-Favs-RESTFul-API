const request = require('supertest');
const mongoose = require('mongoose');
const configExpress = require('../../config/express');
const { signToken } = require('../../auth/auth.services');

const app = configExpress();

const login = {
  email: 'cmauricio.arango@gmail.com',
  password: 'Password1.',
};

describe('favLists', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  test('should return status 200 and get all favLists in the DB', async () => {
    const { statusCode } = await request(app).get('/api/favLists');

    expect(statusCode).toBe(200);
  });

  test('should return status 200 and get a single favList', async () => {
    const id = '63214683ca34ef553baf579e';

    const { statusCode } = await request(app).get(`/api/favLists/${id}`);

    expect(statusCode).toBe(200);
  });

  test('should return status 200 and get all user favLists', async () => {
    const jwt = await signToken(login);
    console.log(
      '🚀 ~ file: favLists.controller.test.js ~ line 39 ~ test ~ jwt',
      jwt
    );

    const { statusCode } = await request(app)
      .get('/api/favs')
      .set('Authorization', `Bearer ${jwt}`);
    expect(statusCode).toBe(200);
  });

  test('should return status 201 and create a favList', async () => {
    const jwt = await signToken(login);
    const data = {
      name: `My favorite songs version ${Math.floor(Math.random() * 1000)}`,
    };
    const { statusCode } = await request(app)
      .post('/api/favLists/')
      .send(data)
      .set('Authorization', `Bearer ${jwt}`);
    expect(statusCode).toBe(201);
  });

  test('should return status 200 and delete a favList', async () => {
    const jwt = await signToken(login);
    const id = '632298b732ee40c77a2c74c0';

    const { statusCode } = await request(app)
      .delete(`/api/favLists/${id}`)
      .set('Authorization', `Bearer ${jwt}`);
    expect(statusCode).toBe(200);
  });
});
