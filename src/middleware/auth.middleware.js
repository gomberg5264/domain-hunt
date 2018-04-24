("use strict");
const path = require("path");
const HOMEDIR = path.join(__dirname, "..");
const { error, success, debug } = require("util-box");

const auth = () => {
	const getApiConfiguration = cb => {
		const api = {};
		try {
			const config = require(path.join(HOMEDIR, "config", "prod.config"));
			api.accessKey = config.api.goDaddy.key;
			api.secret = config.api.goDaddy.secret;
			api.path = config.api.goDaddy.path;
			cb(api);
		} catch (err) {
			error("Unable to read configuration due to", err);
			debug("Falling Back to ENV variables");
			api.accessKey = process.env.ACCESS_KEY;
			api.secret = process.env.SECRET;
			api.path = process.env.API_PATH;
			cb(api);
		}
	};

	return function(req, res, next) {
		getApiConfiguration(function(api) {
			if (api.accessKey && api.secret && api.path) {
				success(JSON.stringify(api));
				req._key_ = api.accessKey;
				req._secret_ = api.secret;
				req._api_path_ = api.path;
			}
			next();
		});
	};
};

module.exports = auth;
