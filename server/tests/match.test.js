import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;
describe('## Match APIs', () => {
  describe('# GET /api/match/:userId', () => {
    it('should get users matching preferences of userId user', (done) => {
      let userNick = {
        username: 'Nick White',
        mobileNumber: '1234567890',
        preferences: {
          gender: 'Female',
          ageHigh: 30,
          ageLow: 20,
          religion: 'None',
          distance: 20
        },
        profile: {
          age: 25,
          gender: 'Male',
          religion: 'None',
          zip: 44143,
        }
      };
      request(app)
        .post('/api/users')
        .send(userNick)
        .expect(httpStatus.OK)
        .then(res => {
          userNick = res.body;
          request(app)
            .get(`/api/match/${userNick._id}`)
            .expect(httpStatus.OK)
            .then(() => {
              const matches = res.body.matches;
              if (matches) {
                matches.forEach(match => {
                  // Check age
                  expect(match.profile.age).to.be
                    .within(userNick.preferences.ageLow, userNick.preferences.ageHigh);
                  // Check gender
                  expect(match.profile.gender).to.equal(userNick.preferences.gender);
                  // Check religion
                  expect(match.profile.religion).to.equal(userNick.preferences.religion);
                });
              }
              done();
            });
        });
    });
    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/api/matches/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });
});
