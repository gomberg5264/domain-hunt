const path = require("path");
const test = require("ava");
const request = require("supertest");
const HOMEDIR = path.join(__dirname, "..", "..", "..");
const SRCDIR = path.join(HOMEDIR, "src");
const baseSettings = require(path.join(HOMEDIR, "test", "_base"));
const { error, debug, success } = require("util-box");

test("GET /ping", async t => {
	t.plan(2);
	const response = await request(baseSettings.BASE_URL).get("/ping");
	t.is(response.status, 200);
	t.is(response.body.message, "pong");
});

test("GET /api", async t => {
	t.plan(2);
	const response = await request(baseSettings.BASE_URL).get("/api");
	t.is(response.status, 200);
	t.is(response.body.message, "Welcome to Domain Hunt's RESTful API 🌎");
});

test("GET /api/available", async t => {
	t.plan(3);
	const response = await request(baseSettings.BASE_URL).get("/api/available?domain=hello.com&checkType=fast");
	t.is(response.status, 200);
	t.is(response.body.domain, "hello.com");
	t.is(response.body.available, false);
});

test.todo("GET /api/suggestions");
