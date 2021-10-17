import request from 'supertest';
import { getConnection } from 'typeorm';
import createServer from '../../../src/server';
import dbConnection from '../../../src/dbConnection';
import { expect } from 'chai';

import getToken from '../../helpers/getStudentToken.helper';

const app = createServer();

describe('GET /api/students/auth/profile - Ruta para obtener el perfil del estudiante', () => {
  let token: string;
  before(async () => {
    await dbConnection();
    token = await getToken();
  });
  after(async () => await getConnection().close());
  it('200 - Muestra el perfil del estudiante', (done) => {
    request(app)
      .get('/api/students/auth/profile')
      .set('token', token)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.name).exist;
        expect(res.body.surname).exist;
        expect(res.body.secondSurname).exist;
        expect(res.body.email).exist;
        done();
      });
  });
  it('405 - Token corrupto', (done) => {
    request(app)
      .get('/api/students/auth/profile')
      .expect('Content-type', /json/)
      .expect(405)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.headers.token).to.undefined;
        expect(res.body.server).to.equal('Token corrupto');
        done();
      });
  });
});
