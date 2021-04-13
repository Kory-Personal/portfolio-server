'use strict';

const mongoose = require('mongoose');

const projects = mongoose.Schema({
  name: { type: String, required: true },
  deployed_link: { type: String, required: true },
  github_link: { type: String },
  tools: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('projects', projects);