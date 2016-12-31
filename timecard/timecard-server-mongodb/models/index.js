"use strict"
let fs = require("fs");
let path = require("path");

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

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach((file) => {
    let model = require('./' + file);
    Models[model.modelName] = model;
  })


module.exports = Models;
