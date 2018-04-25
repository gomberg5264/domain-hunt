("use strict");
const path = require("path");
const router = require("express").Router();
const fetch = require("node-fetch");
const HOMEDIR = path.join(__dirname, "..");
const auth = require(path.join(HOMEDIR, "middleware", "auth.middleware"));
const { httpUtil, error, debug, success } = require("util-box");
const apiRoutes = require("./api.routes");

module.exports = () => {
	router.get("/", (req, res, next) => {
		res.status(200).send("Welcome to Domain Hunt! 🌎");
	});

	router.use("/api", apiRoutes());
	router.get("/ping", (req, res, next) => {
		res.status(200).json({ message: "pong" });
	});

	return router;
};
