import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## User APIs', () => {
  let user = {
    username: 'Nick',
    mobileNumber: '1234567890',
    profile: {
      age: 23,
      gender: 'Male',
      religion: 'Jewish',
      zip: 44143
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
          // Profile
          expect(res.body.profile.age).to.equal(user.profile.age);
          expect(res.body.profile.gender).to.equal(user.profile.gender);
          expect(res.body.profile.religion).to.equal(user.profile.religion);
          expect(res.body.profile.zip.toString()).to.equal(user.profile.zip.toString());
          // Preferences
          expect(res.body.preferences.gender).to.equal(user.preferences.gender);
          expect(res.body.preferences.ageHigh).to.equal(user.preferences.ageHigh);
          expect(res.body.preferences.ageLow).to.equal(user.preferences.ageLow);
          expect(res.body.preferences.religion).to.equal(user.preferences.religion);
          expect(res.body.preferences.distance).to.equal(user.preferences.distance);

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
          // Profile
          expect(res.body.profile.age).to.equal(user.profile.age);
          expect(res.body.profile.gender).to.equal(user.profile.gender);
          expect(res.body.profile.religion).to.equal(user.profile.religion);
          expect(res.body.profile.zip.toString()).to.equal(user.profile.zip.toString());
          // Preferences
          expect(res.body.preferences.gender).to.equal(user.preferences.gender);
          expect(res.body.preferences.ageHigh).to.equal(user.preferences.ageHigh);
          expect(res.body.preferences.ageLow).to.equal(user.preferences.ageLow);
          expect(res.body.preferences.religion).to.equal(user.preferences.religion);
          expect(res.body.preferences.distance).to.equal(user.preferences.distance);
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
      user.username = 'Nick 2';
      request(app)
        .put(`/api/users/${user._id}`)
        .send(user)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal('Nick 2');
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          // Profile
          expect(res.body.profile.age).to.equal(user.profile.age);
          expect(res.body.profile.gender).to.equal(user.profile.gender);
          expect(res.body.profile.religion).to.equal(user.profile.religion);
          expect(res.body.profile.zip.toString()).to.equal(user.profile.zip.toString());
          // Preferences
          expect(res.body.preferences.gender).to.equal(user.preferences.gender);
          expect(res.body.preferences.ageHigh).to.equal(user.preferences.ageHigh);
          expect(res.body.preferences.ageLow).to.equal(user.preferences.ageLow);
          expect(res.body.preferences.religion).to.equal(user.preferences.religion);
          expect(res.body.preferences.distance).to.equal(user.preferences.distance);

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
          expect(res.body.username).to.equal('Nick 2');
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          done();
        });
    });
  });
});
