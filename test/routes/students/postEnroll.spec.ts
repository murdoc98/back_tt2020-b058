import request from 'supertest';
import { getConnection } from 'typeorm';
import createServer from '../../../src/server';
import getToken from '../../helpers/getStudentToken.helper';
import getGroup from '../../helpers/getGroup.helper';
import dbConnection from '../../../src/dbConnection';
import { expect } from 'chai';

import Group from '../../../src/models/Group.model';

const app = createServer();

describe('POST /api/students/groups/<groupId>/enroll - Solicita la inscripcion a un grupo', () => {
  let token: string;
  let group: Group;
  before(async () => {
    await dbConnection();
    token = await getToken();
    group = await getGroup();
  });
  after(async () => await getConnection().close());
  it('200 - El alumno ha solicitado la inscipcion a un grupo', (done) => {
    request(app)
      .post(`/api/students/groups/${group.id}/enroll`)
      .set('token', token)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // TODO Definir el tipo de salida del request
        done();
      });
  });
  it('404 - El grupo no ha sido encontrado', (done) => {
    request(app)
      .post('/api/students/groups/thisIsATest/enroll')
      .set('token', token)
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