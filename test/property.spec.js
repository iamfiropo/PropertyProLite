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
