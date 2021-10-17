import request from 'supertest';
import createServer from '../../src/server';

const app = createServer();

export default async (): Promise<string> => {
  const loginData = {
    email: 'oscarmartinez1998@hotmail.es',
    password: 'thisIsAtest98!'
  };
  const response = await request(app)
    .post('/api/teachers/auth/login')
    .send(loginData);
  const token = response.headers.token;
  return token;
};
