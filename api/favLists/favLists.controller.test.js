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
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  test('should return status 200 and get all favLists in the DB', async () => {
    const jwt = await signToken(login);
    const response = await request(app)
      .get('/api/favLists')
      .set('Authorization', `Bearer ${jwt}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch('Showing all favLists');
  });

  test('should return status 200 and get a single favList', async () => {
    const id = '6335c1f58b4d9bd6accf2585';
    const jwt = await signToken(login);

    const response = await request(app)
      .get(`/api/favLists/${id}`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(`Showing favList id:${id}`);
  });

  test('should return status 200 and get all user favLists', async () => {
    const jwt = await signToken(login);

    const response = await request(app)
      .get('/api/favLists/user')
      .set('Authorization', `Bearer ${jwt}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch('Showing all user favLists');
  });

  test('should return status 201 and create a favList', async () => {
    const jwt = await signToken(login);
    const data = {
      name: `My favorite songs version ${Math.floor(Math.random() * 10000)}`,
    };
    const response = await request(app)
      .post('/api/favLists/')
      .send(data)
      .set('Authorization', `Bearer ${jwt}`);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toMatch(`FavList successfuly created`);
  });

  test('should return status 200 and delete a favList', async () => {
    const jwt = await signToken(login);
    const id =
      '633473c639a3a18d7cbeb867' ||
      '6335c2b625cfbede484d023d' ||
      '6335c2d8907415b91a1561a8' ||
      '6335c1f58b4d9bd6accf2585';

    const response = await request(app)
      .delete(`/api/favLists/${id}`)
      .set('Authorization', `Bearer ${jwt}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(`FavList eliminated`);
  });
});
