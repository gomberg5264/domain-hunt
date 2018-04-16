("use strict");
const path = require("path");
const express = require("express");
const http = require("http");
const logger = require("morgan");
const routes = require("./routes");
const port = process.env.PORT || 5000;
const HOMEDIR = path.join(__dirname, ".");
const { error, debug, success } = require(path.join(HOMEDIR, "util", "output.util"));
const app = express();

app.set("port", port);
app.use(logger("combined"));
app.use("/", (req, res) => {
	res.send("Hey! There's nothing to see here. Ciao 👋");
});
app.use("/domain-hunt", routes());

// server configuration
const onListening = () => {
	success("Listening on port", port);
};

const onError = err => {
	error(err.message);
};

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
