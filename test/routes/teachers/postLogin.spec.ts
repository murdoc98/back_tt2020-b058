import request from 'supertest';
import { getConnection } from 'typeorm';
import { expect } from 'chai';

// Models and instances from original project
import createServer from '../../../src/server';
import sqlConnection from '../../../src/sqlConnection';

const app = createServer();

describe('POST /api/teachers/auth/login - Ruta de autenticacion de profesores', () => {
  before(async () => await sqlConnection());
  after(async () => await getConnection().close());
  it('200 - Credenciales correctas', (done) => {
    request(app)
      .post('/api/teachers/auth/login')
      .send({
        email: 'oscarmartinez1998@hotmail.es',
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
      .post('/api/teachers/auth/login')
      .send({
        email: 'oscarmartinez1998@hotmail.eso',
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
      .post('/api/teachers/auth/login')
      .send({
        email: 'oscarmartinez1998@hotmail.es',
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
      .post('/api/teachers/auth/login')
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
