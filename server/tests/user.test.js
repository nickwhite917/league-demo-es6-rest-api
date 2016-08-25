import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## User APIs', () => {
  let user = {
    username: 'Nick123',
    mobileNumber: '1234567890',
    profile: {
      age: 23,
      gender: 'Male',
      religion: 'Jewish',
      location: {
        coordinates: [100, 150]
      }
    },
    preferences: {
      gender: 'Female',
      ageHigh: 40,
      ageLow: 20,
      religion: 'Jewish',
      distance: 20
    }
  };

  describe('# POST /api/users', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/users')
        .send(user)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal(user.username);
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          expect(res.body.profile).to.equal(user.profile);
          expect(res.body.preferences).to.equal(user.preferences);
          user = res.body;
          done();
        });
    });
  });

  describe('# GET /api/users/:userId', () => {
    it('should get user details', (done) => {
      request(app)
        .get(`/api/users/${user._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal(user.username);
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          expect(res.body.profile).to.equal(user.profile);
          expect(res.body.preferences).to.equal(user.preferences);
          done();
        });
    });

    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/api/users/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });

  describe('# PUT /api/users/:userId', () => {
    it('should update user details', (done) => {
      user.username = 'Nick12345';
      request(app)
        .put(`/api/users/${user._id}`)
        .send(user)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal('Nick12345');
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          expect(res.body.profile).to.equal(user.profile);
          expect(res.body.preferences).to.equal(user.preferences);
          done();
        });
    });
  });

  describe('# GET /api/users/', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/api/users')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('# DELETE /api/users/', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/api/users/${user._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal('Nick12345');
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          done();
        });
    });
  });
});
