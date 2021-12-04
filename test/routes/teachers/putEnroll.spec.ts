import request from 'supertest';
import { getConnection } from 'typeorm';
import createServer from '../../../src/server';
import getToken from '../../helpers/getTeacherToken.helper';
import sqlConnection from '../../../src/sqlConnection';
import { expect } from 'chai';

const app = createServer();

describe('PUT /api/teachers/groups/<groupId>/<studentId> - Acepta a un alumno', () => {
  let token: string;
  let groupId: string;
  let studentId: string;
  before(async () => {
    await sqlConnection();
    token = await getToken();
  });
  after(async () => await getConnection().close());
  it('200 - Grupo creado', (done) => {
    request(app)
      .put(`/api/teachers/groups/${groupId}/${studentId}`)
      .send({
        status: true
      })
      .set('token', token)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).eql('Grupo creado');
        done();
      });
  });
  it('404 - No se encontro el registro', (done) => {
    request(app)
      .put(`/api/teachers/groups/${groupId}/${studentId}`)
      .set('token', token)
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Inscripcion no encontrada');
        done();
      });
  });
  it('405 - Token corrupto', (done) => {
    request(app)
      .put(`/api/teachers/groups/${groupId}/${studentId}`)
      .send({
        name: '2CV9'
      })
      .expect('Content-type', /json/)
      .expect(405)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Token corrupto');
        done();
      });
  });
});
