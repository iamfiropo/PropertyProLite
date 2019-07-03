import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import dotenv from 'dotenv';
import server from '../server';

dotenv.config();


chai.use(chaiHttp);

describe('Testing signup controller', () => {
  const signupUrl = '/api/v1/auth/signup';
  it('should register a new user when all the parameters are given',
    (done) => {
      chai
        .request(server)
        .post(signupUrl)
        .send({
          email: 'test@test.com',
          firstName: 'patrick',
          lastName: 'olorunfunmi',
          password: 'password1',
          phoneNumber: '07089898989',
          address: '10, olorunfunmi street, iponri, america',
          isAdmin: true,
        })

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.a('object');
          // expect(response.body.data).to.have.property('token');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          // expect(response.body.data.token).to.be.a('string');
          expect(response.body.data.email).to.equal('test@test.com');
          expect(response.body.message).to.equal('Successfully Created');
          done();
        });
    });

  it('should not register a user when the email is missing',
    (done) => {
      chai
        .request(server)
        .post(signupUrl)
        .send({
          firstName: 'patrick',
          lastName: 'olorunfunmi',
          password: 'password1',
          phoneNumber: '07089898989',
          address: '10, olorunfunmi street, iponri, america',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Please fill all the required fields');
          done();
        });
    });

  it('should not register a user when the first name is missing',
    (done) => {
      chai
        .request(server)
        .post(signupUrl)
        .send({
          lastName: 'olorunfunmi',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Please fill all the required fields');
          done();
        });
    });

  it('should not register a user when the last name is missing', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        firstName: 'patrick',
        password: 'password',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Please fill all the required fields');
        done();
      });
  });

  it('should not register a user when the password is missing', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'patrick@gmail,com',
        firstName: 'folagbade',
        lastName: 'olorunfunmi',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to
          .equal('Please fill all the required fields');
        done();
      });
  });

  it('should not register a user when the phone no is missing', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'patrick@gmail,com',
        firstName: 'folagbade',
        lastName: 'olorunfunmi',
        password: 'password',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Please fill all the required fields');
        done();
      });
  });

  it('should not register a user when the address is missing', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'patrick@gmail,com',
        firstName: 'folagbade',
        lastName: 'olorunfunmi',
        password: 'password',
        phoneNumber: '07089898989',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Please fill all the required fields');
        done();
      });
  });

  // it('should not register a user when the email already exist', (done) => {
  //   chai
  //     .request(server)
  //     .post(signupUrl)
  //     .send({
  //       email: 'test@test.com',
  //       firstName: 'patrick',
  //       lastName: 'olorunfunmi',
  //       password: 'password',
  //       confirPassword: 'password',
  //       phoneNumber: '07089898989',
  //       address: '10, olorunfunmi street, iponri, america',
  //       type: 'customer',
  //     })
  //     .end((error, response) => {
  //       expect(response.body).to.be.an('object');
  //       expect(response.body.status).to.equal(409);
  //       expect(response.body.error).to.be.a('string');
  //       expect(response.body.error).to.equal('Email already exist');
  //       done();
  //     });
  // });
});
