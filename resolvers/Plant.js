'use strict';

const Plant = require('../models/Plant');
const { ObjectId } = require('mongoose').Types;

const fs = require('fs');
const { uploadImage, deleteImage } = require('../utils/ImageService');
const mongoose = require('mongoose');

const plants = async (args, { req, res, authController }) => {
  const start = args.start || 0;
  const limit = args.limit || 10;
  const plants = await Plant.find()
    .skip(start)
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('user');

  try {
    const user = await authController.checkAuth(req, res);
    return plants.map((plant) => {
      plant.likedByMe = plant.likedByUsers.includes(new ObjectId(user._id));
      return plant;
    });
  } catch (error) {
    return plants;
  }
};

const plant = async (args, _) => {
  const plant = await Plant.findById(args.id).populate('user');
  return plant;
};

const addPlant = async (args, { req, res, authController }) => {
  const { file, description } = args;
  const { filename, mimetype, createReadStream } = await file.file;
  const stream = createReadStream();
  const data = await uploadImage(stream, filename, mimetype);

  const user = await authController.checkAuth(req, res);

  const plant = await Plant.create({
    user: user._id,
    description,
    imageUrl: data.Location,
  });

  return plant;
};

const updatePlant = async (args, { req, res, authController }) => {
  const user = await authController.checkAuth(req, res);

  const plant = await Plant.findById(args.id);

  if (plant.user.toString() == user._id) {
    plant.description = args.description;
    await plant.save();
    return plant;
  } else {
    throw new Error('Forbidden');
  }
};

const deletePlant = async (args, { req, res, authController }) => {
  const user = await authController.checkAuth(req, res);

  const plant = await Plant.findById(args.id);

  if (plant.user.toString() == user._id) {
    await Plant.deleteOne({ _id: plant._id });
    return plant;
  } else {
    throw new Error('Forbidden');
  }
};

const likePlant = async (args, { req, res, authController }) => {
  const user = await authController.checkAuth(req, res);
  let plant = await Plant.findById(args.id);

  const likeIndex = await plant.likedByUsers.indexOf(new ObjectId(user._id));

  if (likeIndex > -1) {
    plant.likedByUsers.splice(likeIndex, 1);
  } else {
    plant.likedByUsers.push(user._id);
  }
  return await plant.save();
};

module.exports = {
  plants,
  plant,
  addPlant,
  updatePlant,
  deletePlant,
  likePlant,
};
