'use strict';
const path = require('path');
const HOMEDIR = path.join(__dirname, '..')
const config = require(path.join(HOMEDIR, 'config', 'prod.config'));
const ACCESS_KEY = process.env.ACCESS_KEY || config.api.accessKey

const auth = () => {}

auth.validate= (req, res, next) => {
  if(ACCESS_KEY){
    req._key_ = ACCESS_KEY
  }
  next()
}

module.exports = auth;