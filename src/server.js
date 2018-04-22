("use strict");
const path = require("path");
const http = require("http");
const HOMEDIR = path.join(__dirname, ".");
const { error, debug, success } = require(path.join(HOMEDIR, "util", "output.util"));
const Server = () => {};
/**
 *
 * @param {Object} app - instance of the express application
 */

Server.initialize = app => {
	port = app.get("port");
	// server configuration
	const onListening = () => {
		success(`Listening on port ${port}`);
	};

	const onError = err => {
		error(err.message);
	};

	const server = http.createServer(app);
	server.listen(port);
	server.on("error", onError);
	server.on("listening", onListening);
};

module.exports = Server;
