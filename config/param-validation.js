import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      profile: {
        age: Joi.number().integer().min(18).max(100).required(),
        gender: Joi.string().required(),
        religion: Joi.string().required(),
        location: Joi.object().required()
      },
      preferences: {
        gender: Joi.string().required(),
        ageHigh: Joi.number().integer().min(18).max(100).required(),
        ageLow: Joi.number().integer().min(18).max(100).required(),
        religion: Joi.string().required(),
        distance: Joi.number().integer().min(0).max(250).required()
      }
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
