("use strict");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const port = process.env.PORT || 5000;
const HOMEDIR = path.join(__dirname, ".");
const routes = require(path.join(HOMEDIR, "routes", "main.routes"));
const { error, debug, success } = require("util-box");
const app = express();
const Server = require("./server");

app.set("port", port);
app.use(logger("combined"));
app.use("/ping", (req, res, next) => {
	res.status(200).json({ message: "pong" });
});
app.use("/api", routes());

// start Server
Server.initialize(app);

module.exports = app;
