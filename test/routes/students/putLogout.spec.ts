import request from 'supertest';
import { getConnection } from 'typeorm';
import mongoose from 'mongoose';
import createServer from '../../../src/server';
import getToken from '../../helpers/getStudentToken.helper';
import sqlConnection from '../../../src/sqlConnection';
import { expect } from 'chai';

const app = createServer();

describe('PUT /api/students/auth/logout - Cierra la sesion actual', () => {
  let token: string;
  before(async () => {
    await sqlConnection();
    token = await getToken();
  });
  after(async () => await getConnection().close());
  it('200 - Se cerro la sesion', (done) => {
    request(app)
      .put('/api/students/auth/logout')
      .set('token', token)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).eql('Sesion finalizada');
        done();
      });
  });
  it('405 - Token corrupto', (done) => {
    request(app)
      .put('/api/students/auth/logout')
      .expect('Content-type', /json/)
      .expect(405)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Token corrupto');
        done();
      });
  });
});
