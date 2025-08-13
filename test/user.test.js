import supertest from 'supertest';
import { web } from '../src/application/web.js';
import { logger } from '../src/application/logging.js';
import { removeTestUser, createTestUser, getTestUser } from './test-utils.js';
import bcrypt from 'bcrypt';

describe('POST /api/user', function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it('should can register new user', async () => {
    const result = await supertest(web).post('/api/user').send({
      username: 'test',
      password: 'rahasia',
      name: 'test',
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.password).toBeUndefined();
  });

  it('should reject if request is invalid', async () => {
    const result = await supertest(web).post('/api/user').send({
      username: '',
      password: '',
      name: '',
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if username already registered', async () => {
    let result = await supertest(web).post('/api/user').send({
      username: 'test',
      password: 'rahasia',
      name: 'test',
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post('/api/user').send({
      username: 'test',
      password: 'rahasia',
      name: 'test',
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('POST /api/user/login', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can login', async () => {
    const result = await supertest(web).post('/api/user/login').send({
      username: 'test',
      password: 'rahasia',
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe('test');
  });

  it('should reject login if request is invalid', async () => {
    const result = await supertest(web).post('/api/user/login').send({
      username: '',
      password: '',
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if password is wrong', async () => {
    const result = await supertest(web).post('/api/user/login').send({
      username: 'test',
      password: 'salah',
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if username is wrong', async () => {
    const result = await supertest(web).post('/api/user/login').send({
      username: 'salah',
      password: 'salah',
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/user/current', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('Should can get current user', async () => {
    const result = await supertest(web).get('/api/user/current').set('Authorization', 'test');

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
  });

  it('Should reject if token is invalid', async () => {
    const result = await supertest(web).get('/api/user/current').set('Authorization', 'salah');

    logger.info(result);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('PATCH /api/user/current', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('Should Can Update User', async () => {
    const result = await supertest(web)
      .patch('/api/user/current')
      .set('Authorization', 'test')
      .send({
        name: 'Hamam',
        password: 'rahasialagi',
      });

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('Hamam');

    const user = await getTestUser();

    expect(await bcrypt.compare('rahasialagi', user.password)).toBe(true);
  });

  it('Should Can Update User name', async () => {
    const result = await supertest(web)
      .patch('/api/user/current')
      .set('Authorization', 'test')
      .send({
        name: 'Hamam',
      });

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('Hamam');
  });

  it('Should Can Update User', async () => {
    const result = await supertest(web)
      .patch('/api/user/current')
      .set('Authorization', 'test')
      .send({
        password: 'rahasialagi',
      });

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');

    const user = await getTestUser();

    expect(await bcrypt.compare('rahasialagi', user.password)).toBe(true);
  });

  it('Should reject if request is not valid', async () => {
    const result = await supertest(web)
      .patch('/api/user/current')
      .set('Authorization', 'salah')
      .send();

    logger.info(result);

    expect(result.status).toBe(401);
  });
});

describe('DELETE /api/users/logout', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can logout', async () => {
    const result = await supertest(web).delete('/api/user/logout').set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });

  it('should reject logout if token is invalid', async () => {
    const result = await supertest(web).delete('/api/user/logout').set('Authorization', 'salah');

    expect(result.status).toBe(401);
  });
});
