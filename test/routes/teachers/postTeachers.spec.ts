import request from 'supertest';
import { getConnection } from 'typeorm';
import { expect } from 'chai';

// Models and instances from original project
import createServer from '../../../src/server';
import sqlConnection from '../../../src/sqlConnection';

const app = createServer();

describe('POST /api/teachers/auth/signin - Registra a un profesor dentro de la plataforma', () => {
  before(async () => await sqlConnection());
  after(async () => await getConnection().close());
  it('201 - Usuario registrado', (done) => {
    request(app)
      .post('/api/teachers/auth/signin')
      .send({
        name: 'John',
        surname: 'Doe',
        secondSurname: 'Supertest',
        email: 'johnny@gmail.com',
        password: 'thisIsAtest98!'
      })
      .expect('Content-type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).eql('Estudiante registrado');
        done();
      });
  });
  it('400 - Faltan campos en el registro del estudiante', (done) => {
    request(app)
      .post('/api/teachers/auth/signin')
      .send({
        name: 'John',
        surname: 'Doe',
        secondSurname: 'Supertest',
        password: 'thisIsAtest98!'
      })
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).eql('Error en el input');
        done();
      });
  });
  it('405 - Usuario registrado previamente', (done) => {
    request(app)
      .post('/api/teachers/auth/signin')
      .send({
        name: 'John',
        surname: 'Doe',
        secondSurname: 'Supertest',
        email: 'johnny@gmail.com',
        password: 'thisIsAtest98!'
      })
      .expect('Content-type', /json/)
      .expect(405)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.server).eql('Alguno de los siguientes campos (nombre completo, email) ya han sido registrados en el sistema');
        done();
      });
  });
});