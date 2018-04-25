("use strict");
const path = require("path");
const router = require("express").Router();
const fetch = require("node-fetch");
const HOMEDIR = path.join(__dirname, "..");
const auth = require(path.join(HOMEDIR, "middleware", "auth.middleware"));
const { httpUtil, error, debug, success } = require("util-box");

module.exports = () => {
	// use auth middleware
	router.use(auth());

	router.get("/", (req, res, next) => {
		res.status(200).json({
			message: "Welcome to Domain Hunt's RESTful API 🌎"
		});
	});

	// checks for domain availability
	router.get("/available", (req, res, next) => {
		if (req._key_ && req._secret_ && req._api_path_) {
			let reqPath = req._api_path_;
			let reqParams = {
				domain: req.query.domain,
				checkType: req.query.checkType,
				forTransfer: req.query.forTransfer
			};
			if (!reqParams.domain) {
				error("Missing or invalid parameters: domain");
				res.status(400).send("Missing or invalid parameters: domain");
			}
			let queryString = httpUtil.makeQueryString(reqParams);
			let reqOptions = {
				method: "GET",
				headers: {
					Authorization: `sso-key ${req._key_}:${req._secret_}`
				}
			};

			let reqUrl = `${reqPath}/domains/available${queryString}`;
			debug(`Fetching ${reqUrl} with options`, JSON.stringify(reqOptions));
			fetch(reqUrl, reqOptions)
				.then(response => httpUtil.handleApiResponse(response))
				.then(jsonResponse => {
					debug("Received JSON Response " + JSON.stringify(jsonResponse));
					res.status(200).json(jsonResponse);
				})
				.catch(err => {
					error("ERROR during fetch /domains/available", err);
					res.status(err.statusCode).send(err.message);
				});
		} else {
			res.status(500).send("Unexpected Error: Unable to validate API for Domain Search");
		}
	});

	// provides domain-name suggestions based on input query
	router.get("/suggestions", (req, res, next) => {
		if (req._key_ && req._secret_ && req._api_path_) {
			let reqPath = req._api_path_;
			/**
			 *  query - domain to search for suggestion
			 *  country - Two letter ISO country code
			 *  city - Name of city as hint
			 *  waitMs - Max time in ms to wait for res
			 **/
			let reqParams = {
				query: req.query.query,
				country: req.query.country,
				city: req.query.city,
				waitMs: req.query.waitMs
			};
			// check if query for suggesting is present
			if (!reqParams.query) {
				error("Missing or invalid parameters: query");
				res.status(400).send("Missing or invalid parameters: query");
			} else {
				let queryString = httpUtil.makeQueryString(reqParams);
				let reqOptions = {
					method: "GET",
					headers: {
						Authorization: `sso-key ${req._key_}:${req._secret_}`
					}
				};
				let reqUrl = `${reqPath}/domains/suggest${queryString}`;
				debug(`Fetching ${reqUrl} with options`, JSON.stringify(reqOptions));
				fetch(reqUrl, reqOptions)
					.then(response => httpUtil.handleApiResponse(response))
					.then(jsonResponse => {
						debug("Received JSON Response " + JSON.stringify(jsonResponse));
						res.status(200).json(jsonResponse);
					})
					.catch(err => {
						error("ERROR during fetch /domains/suggest", err);
						res.status(err.statusCode).send(err.message);
					});
			}
		} else {
			res.status(500).send("Unexpected Error: Unable to validate API for Domain Search");
		}
	});

	return router;
};
