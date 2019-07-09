import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { config } from 'dotenv';
import server from '../server';

config();

chai.use(chaiHttp);

describe('Testing update property advert data', () => {
  const propertyUrl = '/api/v1/property/1';
  it('should get the updated property data successfully',
    (done) => {
      chai
        .request(server)
        .patch(propertyUrl)
        .send({
          price: 22500.55,
          state: 'lagos',
          city: 'oworonshoki',
          address: '2, ladipo street',
        })
        .end((error, response) => {
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
  it('should get the updated property data successfully',
    (done) => {
      chai
        .request(server)
        .patch(propertyUrl)
        .end((error, response) => {
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
