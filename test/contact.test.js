import supertest from 'supertest';
import { web } from '../src/application/web.js';
import { logger } from '../src/application/logging.js';
import {
  removeTestUser,
  createTestUser,
  removeAllTestContacts,
  createTestContact,
  getTestContact,
} from './test-utils.js';

describe('POST /api/contacts', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can add contact', async () => {
    const result = await supertest(web).post('/api/contacts').set('Authorization', 'test').send({
      first_name: 'test',
      last_name: 'test',
      email: 'test@gmail.com',
      phone: '080923232324',
    });

    // logger.info('Add contact', result);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe('test');
    expect(result.body.data.last_name).toBe('test');
    expect(result.body.data.email).toBe('test@gmail.com');
    expect(result.body.data.phone).toBe('080923232324');
  });

  it('should reject if request is not valid', async () => {
    const result = await supertest(web).post('/api/contacts').set('Authorization', 'test').send({
      first_name: '',
      last_name: 'test',
      email: 'test',
      phone: '0809232323245555555555555',
    });

    // logger.info('Add contact', result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId', function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it('should return 404 if contact id is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/contacts/' + (testContact.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});
