'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: String, required: true, default: true },
  bio: { type: String, required: false, default: true },
  userType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  profileImageUrl: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);
