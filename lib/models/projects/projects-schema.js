'use strict';

const mongoose = require('mongoose');

const projects = mongoose.Schema({
  name: { type: String, required: true },
  deployed: { type: String, required: true },
  github: { type: String },
  tools: { type: String, required: true },
});

module.exports = mongoose.model('projects', projects);