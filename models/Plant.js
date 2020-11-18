'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  imageUrl: { type: String, required: true },
  description: { type: String },
  likedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plant', plantSchema);
