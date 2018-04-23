// filename is underscored to avoid running by ava
const path = require("path");
const { error, debug, success } = require("util-box");
const SRCDIR = path.join(__dirname, "..", "src");
const config = require(path.join(SRCDIR, "config", "test.config"));
const BASE_URL = `${config.test.protocol}://${config.test.host}:${config.test.port}`;
const baseTestSettings = {};
baseTestSettings.BASE_URL = BASE_URL;
success(`Using BASE_URL as ${BASE_URL}`);
module.exports = baseTestSettings;
