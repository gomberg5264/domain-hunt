'use strict';
const path = require('path');
const router = require('express').Router();
const HOMEDIR = path.join(__dirname, '..')
const config = require(path.join(HOMEDIR , 'config', 'prod.config'))
// const Proxy = require(path.join(HOMEDIR, 'proxy'))
const auth = require(path.join(HOMEDIR, 'middleware', 'auth.middleware'))
// const httpProxyServer = Proxy.setup()

const proxyRoutes = () => {
  router.use('/status', auth, (req, res, next)=> {
      if(req._key_){
        // target = `${config.api.path}${req.originalUrl}`
        // httpProxyServer.web(req, res, target)
        res.status(200).send("Hello! Welcome to Domain Hunt 🌎")
      }
      else
        res.status(500).send('Unexpected Error: Unable to validate API for Domain Search')
    });
    return router;
};

module.exports = proxyRoutes

