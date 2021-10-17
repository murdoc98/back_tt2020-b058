import request from 'supertest';
import createServer from '../../src/server';

const app = createServer();

export default async (): Promise<string> => {
  const loginData = {
    email: 'oscarmartinez1998lol@gmail.com',
    password: 'thisIsAtest98!'
  };
  const response = await request(app)
    .post('/api/students/auth/login')
    .send(loginData);
  const token = response.headers.token;
  return token;
};
