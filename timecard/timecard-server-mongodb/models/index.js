"use strict"
let mongoose = require('mongoose');
let opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
};

let env = process.env.NODE_ENV || "dev";
let Models = {};

switch (env) {
  case 'dev':
    mongoose.connect("mongodb://localhost:27017/time_cards", opts)
    break;
  default:
    throw new Error('Unknown execution environment:' + env );
}

let TimeCard = require('./time_card.js');

Models.TimeCard = TimeCard;

module.exports = Models;
