import request from 'supertest';
import { getConnection } from 'typeorm';
import createServer from '../../../src/server';
import getToken from '../../helpers/getTeacherToken.helper';
import sqlConnection from '../../../src/sqlConnection';
import { expect } from 'chai';

const app = createServer();

describe('GET /api/teachers/groups - Obtener grupos asociados al profesor', () => {
  let token: string;
  before(async () => {
    await sqlConnection();
    token = await getToken();
  });
  after(async () => await getConnection().close());
  it('200 - Muestra los grupos asociados al profesor autenticado', (done) => {
    request(app)
      .get('/api/teachers/groups')
      .set('token', token)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // TODO Definir el tipo de salida del request
        done();
      });
  });
  it('405 - Token corrupto', (done) => {
    request(app)
      .get('/api/teachers/groups')
      .expect('Content-type', /json/)
      .expect(405)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Token corrupto');
        done();
      });
  });
});
