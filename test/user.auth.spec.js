import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import server from '../server';

chai.use(chaiHttp);

describe('Testing signup controller', () => {
  const signupUrl = '/api/v1/auth/signup';
  it('should register a new user when all the parameters are given',
    (done) => {
      chai.request(server)
        .post(signupUrl)
        .send({
          firstName: 'ropo',
          lastName: 'olatujoye',
          email: 'test@test.com',
          password: 'password',
          confirmPassword: 'password',
        })

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.a('object');
          expect(response.body.data).to.have.property('token');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data.token).to.be.a('string');
          expect(response.body.data.email).to.equal('test@test.com');
          done();
        });
    });

  it('should not register a user when the email is missing',
    (done) => {
      chai.request(server)
        .post(signupUrl)
        .send({
          firstName: 'michael',
          lastName: 'olatujoye',
          username: 'michael123',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

  it('should not register a user when the first name is missing', (done) => {
    chai.request(server)
      .post(signupUrl)
      .send({
        lastName: 'olatujoye',
        username: 'michael123',
        password: 'password',
        confirmPassword: 'password',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('First name is required');
        done();
      });
  });


  it('should not register a user when the last name is missing', (done) => {
    chai.request(server)
      .post(signupUrl)
      .send({
        firstName: 'olatujoye',
        username: 'michael123',
        password: 'password',
        confirmPassword: 'password',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Last name is required');
        done();
      });
  });

  it('should not register a user when the password is missing', (done) => {
    chai.request(server)
      .post(signupUrl)
      .send({
        email: 'ropo234@gmail,com',
        firstName: 'olatujoye',
        lastName: 'michael123',
        username: 'password',
        confirmPassword: 'password',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Password is required');
        done();
      });
  });

  it('should not register a user when the passwords do not match', (done) => {
    chai.request(server)
      .post(signupUrl)
      .send({
        email: 'ropo23@gmail.com',
        firstName: 'michael',
        lastName: 'olatujoye',
        username: 'michael123',
        password: 'password',
        confirmPassword: 'Passwords do not match',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Passwords do not match');
        done();
      });
  });

  it('should not register a user when the email already exist', (done) => {
    chai.request(server)
      .post(signupUrl)
      .send({
        firstName: 'ropo',
        lastName: 'olatujoye',
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Email already exist');
        done();
      });
  });
});
