import request from 'supertest';
import { getConnection } from 'typeorm';
import createServer from '../../../src/server';
import dbConnection from '../../../src/dbConnection';
import { expect } from 'chai';

const app = createServer();

describe('POST /api/teachers/groups - Crear un grupo', () => {
  before(async () => await dbConnection());
  after(async () => await getConnection().close());
  it('200 - Grupo creado', (done) => {
    request(app)
      .post('/api/teachers/groups')
      .send({
        name: '2CV9'
      })
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
      .post('/api/teachers/groups')
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).to.equal('Usuario no encontrado');
        done();
      });
  });
  it('405 - Token corrupto', (done) => {
    request(app)
      .post('/api/teachers/groups')
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
