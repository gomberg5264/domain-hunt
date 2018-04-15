'use strict';
const path = require('path');
const httpProxy = require('http-proxy');
const HOMEDIR = path.join(__dirname, '.');
const config = require(path.join(HOMEDIR, 'config', 'prod.config'));

const proxy = () => {}

// setup proxy server
proxy.setup = () => {
  const proxyOptions = config.proxy.options;
  const httpProxyServer = httpProxy.createProxyServer(proxyOptions);
  return httpProxyServer;
}

module.exports = proxy