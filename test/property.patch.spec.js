import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import faker from 'faker';
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

  describe('Testing update property advert data', () => {
    const propertyUrl = '/api/v1/property/1';
    it('should get the updated property data successfully',
      (done) => {
        chai
          .request(server)
          .patch(propertyUrl)
          .set('Authorization', `Bearer ${token}`)
          .send({
            // owner_email: 'oluwa@gmail.com',
            price: 22500.55,
            state: 'lagos',
            city: 'oworonshoki',
            address: '2, ladipo street',
            type: 'bungalow',
            image_url: 'https://pixabay.com/photos/portrait-woman-lady-coffee-bar-4246954/',
          })
          .end((error, response) => {
            // console.log('******update********', response.body);
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(200);
            expect(response.body.message).to.be.a('string');
            expect(response.body.message).to.equal('Updated Successfully');
            done();
          });
      });

    it('should not update property advert when the price field is not valid',
      (done) => {
        chai
          .request(server)
          .patch(propertyUrl)
          .send({
            price: 'ldldldd',
            state: 'lagos',
            city: 'oworonshoki',
            address: '2, ladipo street',
          })
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Enter valid price in numeric');
            done();
          });
      });

    it('should not update property advert when the state is not valid',
      (done) => {
        chai
          .request(server)
          .patch(propertyUrl)
          .send({
            price: 4444.5,
            state: '#######$$$$$$$$$',
            city: 'oworonshoki',
            address: '2, ladipo street',
          })
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Enter valid state');
            done();
          });
      });

    it('should not update property advert when the city is not valid',
      (done) => {
        chai
          .request(server)
          .patch(propertyUrl)
          .send({
            price: 4444.5,
            state: 'lagos',
            city: '#######$$$$$$$$$',
            address: '2, ladipo street',
          })
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Enter valid city');
            done();
          });
      });

    it('should not update property advert when the city is not valid',
      (done) => {
        chai
          .request(server)
          .patch(propertyUrl)
          .send({
            price: 4444.5,
            state: 'lagos',
            city: 'oworo',
            address: '#######$$$$$$$$$',
          })
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(400);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Enter valid address');
            done();
          });
      });
  });

  describe('Testing update property advert data', () => {
    const propertyUrl = '/api/v1/property/1/sold';
    it('should get the property status updated to sold successfully',
      (done) => {
        chai
          .request(server)
          .patch(propertyUrl)
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            // console.log('******update********', response.body);
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(200);
            expect(response.body.message).to.be.a('string');
            expect(response.body.message).to.equal('Mark as sold successfully');
            done();
          });
      });
  });

  describe('Testing the root route', () => {
    const rootUrl = '/api/v1';
    it('should get the root route',
      (done) => {
        chai
          .request(server)
          .get(rootUrl)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(200);
            expect(response.body.message).to.be.a('string');
            expect(response.body.message).to.equal('Welcome to PropertyProLite API');
            done();
          });
      });
  });

  describe('Testing custom 404 route', () => {
    const notFoundUrl = '/api/v1/sljkdsfjlfs';
    it('should get not found route',
      (done) => {
        chai
          .request(server)
          .get(notFoundUrl)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(404);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Page not found');
            done();
          });
      });
  });
});
