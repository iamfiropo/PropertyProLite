import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { config } from 'dotenv';
import server from '../server';

config();

let token;
let wrongUser;
const wrongToken = 'iwiiew8';
chai.use(chaiHttp);
describe('#Property features: ', () => {
  before('Generate token for authorize user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'test@test.com',
        password: 'password1',
      })
      .end((error, response) => {
        token = response.body.data.token;
        if (error) return done();
        done();
      });
  });

  before('Generate token for unauthorize user',
    (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'testee@test.com',
          password: 'password1',
        })
        .end((error, response) => {
          wrongUser = token;
          if (error) return done();
          done();
        });
    });

  describe('Testing get all property adverts controller', () => {
    const propertyUrl = '/api/v1/property';
    it('should get all property adverts successfully',
      (done) => {
        chai
          .request(server)
          .get(propertyUrl)
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(200);
            expect(response.body.message).to.be.a('string');
            expect(response.body.message).to.equal('Got all property adverts successfully');
            done();
          });
      });

    it('Should require token authentication',
      (done) => {
        chai
          .request(server)
          .get(propertyUrl)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(403);
            expect(response.body.status).to.equal(403);
            expect(response.body.error).to.equal('Token required. Please sign in or register as a user');
            done();
          });
      });
  });

  describe('Testing get a specific property advert controller', () => {
    const propertyUrl = '/api/v1/property/1';
    const propertyUrlN = '/api/v1/property/11111';
    it('should get a specific property advert successfully',
      (done) => {
        chai
          .request(server)
          .get(propertyUrl)
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(200);
            expect(response.body.message).to.be.a('string');
            expect(response.body.message).to.equal('Got the specific property advert successfully');
            done();
          });
      });

    it('should not get a specific property advert if the id is not in the database',
      (done) => {
        chai
          .request(server)
          .get(propertyUrlN)
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(404);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Property not found');
            done();
          });
      });
  });

  describe('Testing get all property of a specific type', () => {
    const propertyUrl = '/api/v1/properties?type=duplex';
    const propertyUrlN = '/api/v1/properties';
    it('should get all properties of a specific type successfully',
      (done) => {
        chai
          .request(server)
          .get(propertyUrl)
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(200);
            expect(response.body.message).to.be.a('string');
            expect(response.body.message).to.equal('Got the property type successfully');
            done();
          });
      });

    it('should not get property if the property type is not found',
      (done) => {
        chai
          .request(server)
          .get('/api/v1/properties?type=d')
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(404);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Property type not found. Check the property type query value');
            done();
          });
      });

    it('should not get properties of a specific type successfully',
      (done) => {
        chai
          .request(server)
          .get(propertyUrlN)
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('No valid query detected e.g properties?type=duplex');
            done();
          });
      });
  });
});
