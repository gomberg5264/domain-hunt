'use strict';
const express = require('express');
const http = require('http');
const chalk = require('chalk');
const logger = require('morgan')
const routes = require('./routes')
const port = process.env.PORT || 5000
const app = express();

app.set('port', port)
app.use(logger('combined'))
app.use('/domain-hunt', routes())

// server configuration
const onListening = () => {
  console.log(chalk.blue('Listening on port', port));
};

const onError = (err) => {
  console.log(chalk.red(err));
};

const server = http.createServer(app)
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);