"use strict"
let mongoose = require('mongoose');

let timeCardSchema = mongoose.Schema({
  duration: Number,
  description: String,
  startTime: Date
});

let TimeCard = mongoose.model('TimeCard', timeCardSchema);

module.exports = TimeCard;
