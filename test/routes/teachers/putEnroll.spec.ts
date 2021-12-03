import request from 'supertest';
import { getConnection } from 'typeorm';
import createServer from '../../../src/server';
import getToken from '../../helpers/getTeacherToken.helper';
import sqlConnection from '../../../src/sqlConnection';
import { expect } from 'chai';

const app = createServer();

describe('PUT /api/teachers/groups/<groupId>/accept/<studentId> - Acepta a un alumno', () => {
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
      .post(`/api/teachers/groups/${groupId}/${studentId}`)
      .send({
        name: '2CV9'
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
  it('400 - Faltan campos', (done) => {
    request(app)
      .post(`/api/teachers/groups/${groupId}/${studentId}`)
      .set('token', token)
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Error en el input');
        done();
      });
  });
  it('405 - Token corrupto', (done) => {
    request(app)
      .post(`/api/teachers/groups/${groupId}/${studentId}`)
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
