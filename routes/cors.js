const express = require('express');
const cors= require('cors');

const whitelist = ['http://localhost:3000', 'http://localhost:3001',
  'https://localhost:3000', 'https://localhost:3001']; //all the origins that this server will accept
var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) { //check the origin of the request
    corsOptions = {origin: true}; //origin = true means that should be allowed
  } else {
    corsOptions = {origin: false};
  }
  corsOptions.credentials = true;
  corsOptions.exposedHeaders = ['x-auth-token'];
  callback(null, corsOptions);
};

//export 2 versions: one will just accept wildcard * headers,
//the other one - within our whitelist
exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
