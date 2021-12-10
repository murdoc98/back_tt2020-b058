import request from 'supertest';
import { getConnection } from 'typeorm';
import { expect } from 'chai';

// Models and instances from original project
import createServer from '../../../src/server';
import sqlConnection from '../../../src/sqlConnection';
import Group from '../../../src/models/Group.model';

// Helpers
import getToken from '../../helpers/getTeacherToken.helper';
import getGroup from '../../helpers/getGroup.helper';


const app = createServer();

describe('GET /api/teachers/groups/<groupId> - Obtiene un grupo en especifico', () => {
  let token: string;
  let group: Group;
  before(async () => {
    await sqlConnection();
    token = await getToken();
    group = await getGroup('1°A Turno Vespertino Matematicas');
  });
  after(async () => await getConnection().close());
  it('200 - Muestra el grupo especificado', (done) => {
    request(app)
      .get(`/api/teachers/groups/${group.id}`)
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
      .get('/api/teachers/groups/thisIsATest')
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