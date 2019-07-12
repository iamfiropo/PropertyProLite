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

  describe('Testing delete a specific property advert controller', () => {
    const propertyUrl = '/api/v1/property/1';
    const propertyUrlN = '/api/v1/property/11111111111111111111111';
    it('should delete a specific property advert successfully',
      (done) => {
        chai
          .request(server)
          .delete(propertyUrl)
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(200);
            expect(response.body.data).to.be.a('object');
            done();
          });
      });

    it('should not get a specific property advert if the id is not in the database',
      (done) => {
        chai
          .request(server)
          .delete(propertyUrlN)
          .set('Authorization', `Bearer ${token}`)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(404);
            expect(response.body.error).to.be.a('string');
            expect(response.body.error).to.equal('Property id not found');
            done();
          });
      });
  });
});
