import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { config } from 'dotenv';
import server from '../server';

config();

chai.use(chaiHttp);

describe('Testing property controller', () => {
  const propertyUrl = '/api/v1/property';
  it('should create a new property advert when all the parameters are given',
    (done) => {
      chai
        .request(server)
        .post(propertyUrl)
        .send({
          price: 22500.55,
          state: 'lagos',
          city: 'oworonshoki',
          address: '2, ladipo street',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response).to.have.status(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.a('object');
          expect(response.body.data).to.have.property('price');
          expect(response.body.data).to.have.property('state');
          expect(response.body.data).to.have.property('city');
          expect(response.body.data).to.have.property('address');
          expect(response.body.message).to.equal('Successfully Created');
          done();
        });
    });

  it('should not create property advert when the price is missing',
    (done) => {
      chai
        .request(server)
        .post(propertyUrl)
        .send({
          state: 'lagos',
          city: 'oworonshoki',
          address: '2, ladipo street',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Please fill all the required fields');
          done();
        });
    });

  it('should not create property advert when the state is missing',
    (done) => {
      chai
        .request(server)
        .post(propertyUrl)
        .send({
          price: 22500.55,
          city: 'oworonshoki',
          address: '2, ladipo street',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Please fill all the required fields');
          done();
        });
    });

  it('should not create property advert when the city is missing',
    (done) => {
      chai
        .request(server)
        .post(propertyUrl)
        .send({
          price: 22500.55,
          state: 'lagos',
          address: '2, ladipo street',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Please fill all the required fields');
          done();
        });
    });

  it('should not create property advert when the address is missing',
    (done) => {
      chai
        .request(server)
        .post(propertyUrl)
        .send({
          price: 22500.55,
          state: 'lagos',
          city: 'oworonshoki',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Please fill all the required fields');
          done();
        });
    });

  it('should not register an invalid price i.e non numeric', (done) => {
    chai
      .request(server)
      .post(propertyUrl)
      .send({
        price: 'ffff',
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

  it('should not register an invalid state', (done) => {
    chai
      .request(server)
      .post(propertyUrl)
      .send({
        price: 22500.55,
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

  it('should not register an invalid city', (done) => {
    chai
      .request(server)
      .post(propertyUrl)
      .send({
        price: 22500.55,
        state: 'lagos',
        city: '$$$$$$########',
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

  it('should not register an invalid address', (done) => {
    chai
      .request(server)
      .post(propertyUrl)
      .send({
        price: 22500.55,
        state: 'lagos',
        city: 'oworonshoki',
        address: '&&&&&&^^^^^',
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

describe('Testing get all property adverts controller', () => {
  const propertyUrl = '/api/v1/property';
  it('should get all property adverts successfully',
    (done) => {
      chai
        .request(server)
        .get(propertyUrl)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(200);
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('Got all property adverts successfully');
          done();
        });
    });
});

describe('Testing get a specific property advert controller', () => {
  const propertyUrl = '/api/v1/property/1';
  const propertyUrlN = '/api/v1/property/11111111111111111111111';
  it('should get a specific property advert successfully',
    (done) => {
      chai
        .request(server)
        .get(propertyUrl)
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
  const propertyUrl = '/api/v1/properties?type=bungalow';
  const propertyUrlN = '/api/v1/properties';
  it('should get all properties of a specific type successfully',
    (done) => {
      chai
        .request(server)
        .get(propertyUrl)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(200);
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('Got the property type successfully');
          done();
        });
    });

  it('should not get properties of a specific type successfully',
    (done) => {
      chai
        .request(server)
        .get(propertyUrlN)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('No valid query detected e.g properties?type=duplex');
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
