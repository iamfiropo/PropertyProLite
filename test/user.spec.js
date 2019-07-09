import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { config } from 'dotenv';
import server from '../server';

config();

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
          first_name: 'patrick',
          last_name: 'olorunfunmi',
          password: 'password1',
          phoneNumber: '07089898989',
          address: '10, olorunfunmi street, iponri, america',
          is_admin: true,
        })

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.a('object');
          // expect(response.body.data).to.have.property('token');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data).to.have.property('first_name');
          expect(response.body.data).to.have.property('last_name');
          expect(response.body.data).to.have.property('password');
          expect(response.body.data).to.have.property('phoneNumber');
          expect(response.body.data).to.have.property('address');
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
          first_name: 'patrick',
          last_name: 'olorunfunmi',
          password: 'password1',
          phoneNumber: '07089898989',
          address: '10, olorunfunmi street, iponri, america',
          is_admin: true,
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
          email: 'test@test.com',
          last_name: 'olorunfunmi',
          password: 'password1',
          phoneNumber: '07089898989',
          address: '10, olorunfunmi street, iponri, america',
          is_admin: true,
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Please fill all the required fields');
          done();
        });
    });

  it('should not register an invalid first name', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        first_name: 'pa',
        last_name: 'olorunfunmi',
        password: 'password1',
        phoneNumber: '07089898989',
        address: '10, olorunfunmi street, iponri, america',
        is_admin: true,
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Enter valid first name');
        done();
      });
  });

  it('should not register a user when the last name is missing', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        first_name: 'patrick',
        password: 'password1',
        phoneNumber: '07089898989',
        address: '10, olorunfunmi street, iponri, america',
        is_admin: true,
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Please fill all the required fields');
        done();
      });
  });

  it('should not register an invalid last name', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        first_name: 'patrick',
        last_name: 'pa',
        password: 'password1',
        phoneNumber: '07089898989',
        address: '10, olorunfunmi street, iponri, america',
        is_admin: true,
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Enter valid last name');
        done();
      });
  });

  it('should not register a user when the password is missing', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        first_name: 'patrick',
        last_name: 'olorunfunmi',
        phoneNumber: '07089898989',
        address: '10, olorunfunmi street, iponri, america',
        is_admin: true,
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
        email: 'test@test.com',
        first_name: 'patrick',
        last_name: 'olorunfunmi',
        password: 'password1',
        address: '10, olorunfunmi street, iponri, america',
        is_admin: true,
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
        email: 'test@test.com',
        first_name: 'patrick',
        last_name: 'olorunfunmi',
        password: 'password1',
        phoneNumber: '07089898989',
        is_admin: true,
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Please fill all the required fields');
        done();
      });
  });

  it('should not register an invalid address', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        first_name: 'patrick',
        last_name: 'olorunfunmi',
        password: 'password1',
        phoneNumber: '07089898989',
        address: '#####$$$$',
        is_admin: true,
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Enter valid address');
        done();
      });
  });

  it('should not register an invalid email address', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'test@test',
        first_name: 'patrick',
        last_name: 'olorunfunmi',
        password: 'password1',
        phoneNumber: '07089898989',
        address: '10, olorunfunmi street, iponri, america',
        is_admin: true,
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Enter valid email');
        done();
      });
  });

  it('should not register an invalid phone number', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        first_name: 'patrick',
        last_name: 'olorunfunmi',
        password: 'password1',
        phoneNumber: '070898989',
        address: '10, olorunfunmi street, iponri, america',
        is_admin: true,
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Enter valid phone number');
        done();
      });
  });

  it('should not register a password without 8 or more letters and numbers', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        first_name: 'patrick',
        last_name: 'olorunfunmi',
        password: 'passwor',
        phoneNumber: '07089898989',
        address: '10, olorunfunmi street, iponri, america',
        is_admin: true,
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to
          .equal('Your password should be 8 character or more and contains letters and numbers');
        done();
      });
  });

  it('should not register a user when the email already exist', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        first_name: 'patrick',
        last_name: 'olorunfunmi',
        password: 'password1',
        phoneNumber: '07089898989',
        address: '10, olorunfunmi street, iponri, america',
        is_admin: true,
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(409);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Email already exist');
        done();
      });
  });
});

describe('Testing signin controller', () => {
  const signinUrl = '/api/v1/auth/signin';
  it('should sign in user when all the parameters are given',
    (done) => {
      chai
        .request(server)
        .post(signinUrl)
        .send({
          email: 'test@test.com',
          password: 'password1',
        })

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(200);
          expect(response.body.status).to.equal(200);
          expect(response.body).to.be.a('object');
          expect(response.body.message).to.equal('User sign in successfully');
          done();
        });
    });

  it('should not signin a user when the email is missing',
    (done) => {
      chai
        .request(server)
        .post(signinUrl)
        .send({
          password: 'password1',
        })

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Please fill all the required fields');
          done();
        });
    });

  it('should not signin a user when the password is missing',
    (done) => {
      chai
        .request(server)
        .post(signinUrl)
        .send({
          email: 'test@test.com',
        })

        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Please fill all the required fields');
          done();
        });
    });

  it('should not signin an invalid email address', (done) => {
    chai
      .request(server)
      .post(signinUrl)
      .send({
        email: 'test@test',
        password: 'password1',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Enter valid email');
        done();
      });
  });

  it('should not signin an invalid password', (done) => {
    chai
      .request(server)
      .post(signinUrl)
      .send({
        email: 'test@test.com',
        password: 'passwor',
      })
      .end((error, response) => {
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal(400);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Enter valid password');
        done();
      });
  });

  it('should not signin if the password does not match', (done) => {
    chai
      .request(server)
      .post(signinUrl)
      .send({
        email: 'test@test.com',
        password: 'password133',
      })
      .end((error, response) => {
        expect(response.body).to.be.a('object');
        expect(response.body.status).to.equal(401);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Wrong password. Please try again');
        done();
      });
  });

  it('should not signin if the email does not exist', (done) => {
    chai
      .request(server)
      .post(signinUrl)
      .send({
        email: 'testq@test.com',
        password: 'password133',
      })
      .end((error, response) => {
        expect(response.body).to.be.a('object');
        expect(response.body.status).to.equal(404);
        expect(response.body.error).to.be.a('string');
        expect(response.body.error).to.equal('Sorry, we don\'t recognize this email');
        done();
      });
  });
});
