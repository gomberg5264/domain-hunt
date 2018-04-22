"use strict";
const path = require("path");
const HOMEDIR = path.join(__dirname, "..");
const config = require(path.join(HOMEDIR, "config", "prod.config"));
const ACCESS_KEY = process.env.ACCESS_KEY || config.api.goDaddy.key;
const SECRET = process.env.SECRET || config.api.goDaddy.secret;
const API_PATH = process.env.API_PATH || config.api.goDaddy.path;

const auth = () => {
	return function(req, res, next) {
		if (ACCESS_KEY && SECRET) {
			req._key_ = ACCESS_KEY;
			req._secret_ = SECRET;
			req._api_path_ = API_PATH;
		}
		next();
	};
};

module.exports = auth;
