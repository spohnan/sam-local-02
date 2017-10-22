/* jshint node: true, mocha: true, esversion: 6 */
'use strict';

const LambdaTester = require('lambda-tester'),
	expect = require('chai').expect,
	handler = require('../functions/version').handler;

describe('Implemented Apex Methods', function () {
	it('GET /', function () {
		return LambdaTester(handler)
			.event({ "httpMethod": "GET" })
			.expectResult(function (result) {
				expect(result.statusCode).to.equal(200);
				expect('Content-Type', /json/);
				expect(JSON.parse(result.body)).to.have.all.keys(["name", "version"]);
			});
	});
});

describe('Unimplemented Apex Methods', function () {
	['POST', 'PUT', 'DELETE'].forEach(function (method) {
		it(`${method} /`, function () {
			return LambdaTester(handler)
				.event({ "httpMethod": method })
				.expectResult(function (result) {
					expect(result.statusCode).to.equal(501);
					expect('Content-Type', /json/);
				});
		});
	});
});