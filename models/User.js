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
      unique: true
    },
   thoughts: [{
      type: String,
     
    }],
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

//   

const User = model('User', UserSchema);

module.exports = User;
