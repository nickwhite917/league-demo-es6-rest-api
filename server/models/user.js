import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  profile: {
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    religion: {
      type: String,
      required: true
    },
    location: {
      type: {},
      required: true
    }
  },
  preferences: {
    gender: {
      type: {},
      required: true
    },
    ageHigh: {
      type: Number,
      required: true
    },
    ageLow: {
      type: Number,
      required: true
    },
    religion: {
      type: String,
      required: true
    },
    distance: {
      type: Number,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .execAsync().then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .execAsync();
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  listMatches({ limit = 5 } = { }, user) {
    return this
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .where('profile.age').gte(user.preferences.ageLow)
      .where('_id').ne(user.id)
      .where('profile.gender').equals(user.preferences.gender)
      .where('profile.religion').equals(user.preferences.religion)
      .execAsync()
      .then((matches) => {
        if (matches) { return matches; }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
