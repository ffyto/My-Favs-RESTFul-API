const request = require('supertest');
const mongoose = require('mongoose');
const configExpress = require('../../config/express');
const { signToken } = require('../../auth/auth.services');

const app = configExpress();

const login = {
  email: 'cmauicio.arango@gmail.com',
  password: 'Password1.',
};

describe('favLists', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
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
    const id = '632271533ae770ad4901ebe0';

    const { statusCode } = await request(app).get(`/api/favLists/${id}`);

    expect(statusCode).toBe(200);
  });

  test('should return status 200 and get all user favLists', async () => {
    const jwt = signToken(login);

    const { statusCode } = await request(app)
      .get('/api/favs')
      .set('Authorization', `Bearer ${jwt}`);
    expect(statusCode).toBe(200);
  });

  test('should return status 200 and create a favList', async () => {
    const jwt = signToken(login);
    const data = {
      name: `My favorite songs version ${Math.floor(Math.random() * 1000)}`,
    };

    const { statusCode } = await request(app)
      .get('/api/favLists/')
      .send(data)
      .set('Authorization', `Bearer ${jwt}`);
    expect(statusCode).toBe(200);
  });

  test('should return status 200 and delete a favList', async () => {
    const jwt = signToken(login);
    const id = '632271623ae770ad4901ebe8';

    const { statusCode } = await request(app)
      .delete(`/api/favLists/${id}`)
      .set('Authorization', `Bearer ${jwt}`);
    expect(statusCode).toBe(200);
  });
});
