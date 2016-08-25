import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),

      profile: {
        age: Joi.number().integer().min(18).max(100).required()
      },
      // 'profile.gender': Joi.string().required(),
      // 'profile.religion': Joi.string().required(),
      // profileLocation: Joi.string().required(),

      // prefGender: Joi.string().required(),
      // prefAgeHigh: Joi.number().integer().min(18).max(100).required(),
      // prefAgeLow: Joi.number().integer().min(18).max(100).required(),
      // prefReligion: Joi.string().required(),
      // prefDistance: Joi.number().integer().min(0).max(250).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
