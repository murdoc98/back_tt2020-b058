import request from 'supertest';
import { getConnection } from 'typeorm';
import createServer from '../../../src/server';
import dbConnection from '../../../src/dbConnection';
import { expect } from 'chai';

const app = createServer();

describe('POST /api/students/auth/login - Ruta de autenticacion de estudiantes', () => {
  before(async () => await dbConnection());
  after(async () => await getConnection().close());
  it('200 - Credenciales correctas', (done) => {
    request(app)
      .post('/api/students/auth/login')
      .send({
        email: 'oscarmartinez1998lol@gmail.com',
        password: 'thisIsAtest98!'
      })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.headers.token).to.exist;
        expect(res.body.name).exist;
        done();
      });
  });
  it('404 - Email incorrecto', (done) => {
    request(app)
      .post('/api/students/auth/login')
      .send({
        email: 'oscarmartinez1998lol@gmail.como',
        password: 'thisIsAtest98!'
      })
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.headers.token).to.undefined;
        expect(res.body.server).to.equal('Email o contraseña incorrectas');
        done();
      });
  });
  it('404 - Password incorrecto', (done) => {
    request(app)
      .post('/api/students/auth/login')
      .send({
        email: 'oscarmartinez1998lol@gmail.com',
        password: 'testtest'
      })
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.headers.token).to.undefined;
        expect(res.body.server).to.equal('Email o contraseña incorrectas');
        done();
      });
  });
  it('404 - Inyeccion SQL', (done) => {
    request(app)
      .post('/api/students/auth/login')
      .send({
        email: ' or "1"="1"',
        password: ' or "1"="1"'
      })
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.headers.token).to.undefined;
        expect(res.body.server).to.equal('Email o contraseña incorrectas');
        done();
      });
  });
});
