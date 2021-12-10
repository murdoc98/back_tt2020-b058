import request from 'supertest';
import { getConnection } from 'typeorm';
import { expect } from 'chai';

// Models and instances from original project
import createServer from '../../../src/server';
import sqlConnection from '../../../src/sqlConnection';

// Helpers
import getToken from '../../helpers/getStudentToken.helper';

const app = createServer();

describe('GET /api/students/groups - Obtener grupos asociados al profesor', () => {
  let token: string;
  before(async () => {
    await sqlConnection();
    token = await getToken();
  });
  after(async () => await getConnection().close());
  it('200 - Muestra una lista con los grupos a los que el alumno esta inscrito', (done) => {
    request(app)
      .get('/api/students/groups')
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
      .get('/api/students/groups')
      .expect('Content-type', /json/)
      .expect(405)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Token corrupto');
        done();
      });
  });
});