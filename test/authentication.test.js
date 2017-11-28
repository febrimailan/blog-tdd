const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const deleteAllUser = require('../helpers/deleteAllUser');

chai.use(chaiHttp);

const newUser = {
  name: 'test',
  email: 'testing@gmail.com',
  password: '12345678'
}

describe('Authentication', function() {

  before (() => {
    deleteAllUser();
  });

  after (() => {
    deleteAllUser();
  })

  describe('POST /auth/register', function() {
    it('should return registered user', function(requestFinished) {
      chai
        .request(server)
        .post('/auth/register')
        .send(newUser)
        .end(function(err, response) {
          response.status.should.equal(201);
          response.body.should.be.an('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('name');
          response.body.should.have.property('email');
          response.body.should.have.property('password');
          response.body.name.should.equal(newUser.name);
          response.body.email.should.equal(newUser.email);
          requestFinished()
        });
    });
    it('should return error 400 if passed object email already exist', function(requestFinished) {
      chai
        .request(server)
        .post('/auth/register')
        .send(newUser)
        .end(function(err, response) {
          response.status.should.equal(400);
          response.body.should.be.an('object');
          requestFinished()
        });
    });
    it('should return error 400 if passed object email is not valid', function(requestFinished) {
      chai
        .request(server);
        .post('/auth/register')
        .send({ name: 'test1', email: 'test1', password: 'test123'})
        .end(function(err, response) {
          response.status.should.equal(400);
          response.body.should.be.an('object');
          requestFinished()
        })
    })
    it('should return error 400 if password object is not valid', function(requestFinished) {
      chai
        .request(server)
        .post('/auth/register')
        .send({name: 'test1'})
        .end(function(err, response) {
          response.status.should.equal(400);
          response.body.should.be.an('object');
          requestFinished();
        });
    });
  });

  describe('POST /auth/login', function() {
    it('should return JWT access token', function(requestFinished) {
      chai
        .request(server)
        .post('/auth/login')
        .send({email:'testing@gmail.com', password: '12345678'})
        .end(function(err, response) {
          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('access_token');
          requestFinished();
        });
    });
    it('should return error 403 if username password combo is wrong', function(requestFinished) {
      chai
        .request(server)
        .post('/auth/login')
        .send({email: 'test1@mail.com', password: '1234'})
        .end(function(err, response) {
          response.status.should.equal(403);
          response.body.should.be.an('object');
          requestFinished();
        });
    });
  });
});
