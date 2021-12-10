import request from 'supertest';
import { getConnection } from 'typeorm';
import { expect } from 'chai';

// Models and instances from original project
import createServer from '../../../src/server';
import sqlConnection from '../../../src/sqlConnection';
import Group from '../../../src/models/Group.model';

// Helpers
import getToken from '../../helpers/getStudentToken.helper';
import getGroup from '../../helpers/getGroup.helper';


const app = createServer();

describe('POST /api/students/groups/<groupId>/enroll - Solicita la inscripcion a un grupo', () => {
  let token1: string;
  let group: Group;
  before(async () => {
    await sqlConnection();
    token1 = await getToken();
    group = await getGroup('1°C Turno Vespertino Matematicas');
  });
  after(async () => await getConnection().close());
  it('200 - El alumno ha solicitado la inscipcion a un grupo', (done) => {
    request(app)
      .post(`/api/students/groups/${group.id}/enroll`)
      .set('token', token1)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Solicitud de inscripcion enviada al grupo');
        done();
      });
  });
  it('304 - El alumno ya ha sido inscrito en el grupo', (done) => {
    request(app)
      .post(`/api/students/groups/${group.id}/enroll`)
      .set('token', token1)
      .expect(304, done);
  });
  it('404 - El grupo no ha sido encontrado (uuidv4 invalido)', (done) => {
    request(app)
      .post('/api/students/groups/thisIsATest/enroll')
      .set('token', token1)
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Grupo no encontrado');
        done();
      });
  });
  it('404 - El grupo no ha sido encontrado (uuidv4 valido)', (done) => {
    request(app)
      .post('/api/students/groups/a9832646-a451-4f29-99a8-15c055efcfc1/enroll')
      .set('token', token1)
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Grupo no encontrado');
        done();
      });
  });
  it('405 - Token corrupto', (done) => {
    request(app)
      .post(`/api/students/groups/${group.id}/enroll`)
      .expect('Content-type', /json/)
      .expect(405)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Token corrupto');
        done();
      });
  });
});