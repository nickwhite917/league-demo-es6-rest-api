// import request from 'supertest-as-promised';
// import httpStatus from 'http-status';
// import chai from 'chai';
// import { expect } from 'chai';
// import app from '../../index';

// chai.config.includeStack = true;

// describe('## Match APIs', () => {
//   const userNick = {
//     username: 'Nick123',
//     mobileNumber: '1234567890',
//     profile: {
//       age: 23,
//       gender: 'Male',
//       religion: 'Jewish',
//       location: {
//         coordinates: [100, 150]
//       }
//     },
//     preferences: {
//       gender: 'Female',
//       ageHigh: 40,
//       ageLow: 20,
//       religion: 'Jewish',
//       distance: 20
//     }
//   };

//   // const userJessica = {
//   //   username: 'Jessica123',
//   //   mobileNumber: '1234567890',
//   //   profile: {
//   //     age: 23,
//   //     gender: 'Female',
//   //     religion: 'Jewish',
//   //     location: {
//   //       coordinates: [100, 150]
//   //     }
//   //   },
//   //   preferences: {
//   //     gender: 'Male',
//   //     ageHigh: 40,
//   //     ageLow: 20,
//   //     religion: 'Jewish',
//   //     distance: 20
//   //   }
//   // };
//   // const userNobodyLikesMe = {
//   //   username: 'NobodyLikesMe',
//   //   mobileNumber: '9999999999',
//   //   profile: {
//   //     age: 150,
//   //     gender: 'Male',
//   //     religion: 'Not a clue.',
//   //     location: {
//   //       coordinates: [0, 0]
//   //     }
//   //   },
//   //   preferences: {
//   //     gender: 'Male',
//   //     ageHigh: 40,
//   //     ageLow: 20,
//   //     religion: 'Jewish',
//   //     distance: 20
//   //   }
//   // };

//   describe('# GET /api/match/:userId', () => {
//     it('should get users matching preferences of userId user', (done) => {
//       request(app)
//         .get(`/api/match/${userNick._id}`)
//         .expect(httpStatus.OK)
//         .then(res => {
//           expect(res.body.username).to.equal(userNick.username);
//           expect(res.body.mobileNumber).to.equal(userNick.mobileNumber);
//           done();
//         });
//     });

//     it('should report error with message - Not found, when user does not exists', (done) => {
//       request(app)
//         .get('/api/matches/56c787ccc67fc16ccc1a5e92')
//         .expect(httpStatus.NOT_FOUND)
//         .then(res => {
//           expect(res.body.message).to.equal('Not Found');
//           done();
//         });
//     });
//   });
// });
