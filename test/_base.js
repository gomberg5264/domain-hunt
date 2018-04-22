// filename is underscored to avoid running by ava
const path = require("path");
const SRCDIR = path.join(__dirname, "..", "src");
const { debug, success } = require(path.join(SRCDIR, "util", "output.util"));
const config = require(path.join(SRCDIR, "config", "test.config"));
const BASE_URL = `${config.test.protocol}://${config.test.host}:${config.test.port}`;
const baseTestSettings = {};
baseTestSettings.BASE_URL = BASE_URL;

success(`Using BASE_URL as ${BASE_URL}`);
module.exports = baseTestSettings;
