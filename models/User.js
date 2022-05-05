const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {

    username: {
      type: String,
      unique: true,
      trim: true,
      required: 'Please enter the username'
    },
    email: {
      type: String,
      trim: true,
      required: 'Please enter the email',
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'

    }],

    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },

  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

UserSchema.virtual('friendsCount').get(function () {
  return this.friends.length;
})



const User = model('User', UserSchema);

module.exports = User;
