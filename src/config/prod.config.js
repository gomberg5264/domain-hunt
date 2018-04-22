"use strict";
const config = {};

// proxy configuration
config.proxy = {};
config.proxy.options = {};

// External Api configuration
config.api = {};
config.api.goDaddy = {
	key: "dLDMrpPgCEvt_3m8xx7DkuCQyxDR7xLY1Zc",
	secret: "3m91TsNDWF3cGhf5WY6Tfp",
	path: "https://api.godaddy.com/v1"
};

config.api.goDaddy.ote = {
	key: "UzQxLikm_46KxDFnbjN7cQjmw6wocia",
	secret: "46L26ydpkwMaKZV6uVdDWe",
	path: "https://api.ote-godaddy.com/v1"
};

config.api.nameCheap = {
	key: "",
	secret: ""
};

module.exports = config;
