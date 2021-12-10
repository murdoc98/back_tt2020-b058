import request from 'supertest';
import { getConnection } from 'typeorm';
import { expect } from 'chai';

// Models and instances from original project
import createServer from '../../../src/server';
import sqlConnection from '../../../src/sqlConnection';
import Enrollment from '../../../src/models/Enrollment.model';
import Group from '../../../src/models/Group.model';

// Helpers
import getToken from '../../helpers/getTeacherToken.helper';
import getEnrollment from '../../helpers/getEnrollment.helper';
import getGroup from '../../helpers/getGroup.helper';

const app = createServer();

describe('PUT /api/teachers/groups/<groupId>/<studentId> - Acepta a un alumno', () => {
  let token: string;
  let group: Group;
  let enrollment1: Enrollment;
  before(async () => {
    await sqlConnection();
    token = await getToken();
    group = await getGroup('1°A Turno Vespertino Matematicas');
    enrollment1 = await getEnrollment(group.id!, false);
  });
  after(async () => await getConnection().close());
  it('200 - Acceso al estudiante modificado (aceptado)', (done) => {
    request(app)
      .put(`/api/teachers/groups/${group.id}/${enrollment1.id}`)
      .send({
        status: true
      })
      .set('token', token)
      .expect('Content-type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).eql('Acceso del estudiante modificado');
        done();
      });
  });
  it('201 - Acceso al estudiante modificado (archivado)', (done) => {
    request(app)
      .put(`/api/teachers/groups/${group.id}/${enrollment1.id}`)
      .send({
        status: false
      })
      .set('token', token)
      .expect('Content-type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).eql('Acceso del estudiante modificado');
        done();
      });
  });
  it('404 - No se encontro el registro (grupo no encontrado no encontrado)', (done) => {
    request(app)
      .put(`/api/teachers/groups/thisIsATest/${enrollment1.id}`)
      .set('token', token)
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Inscripcion no encontrada');
        done();
      });
  });
  it('404 - No se encontro el registro (estudiante no encontrado)', (done) => {
    request(app)
      .put(`/api/teachers/groups/${group.id}/thisIsATest`)
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
      .put(`/api/teachers/groups/${group.id}/${enrollment1.id}`)
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
