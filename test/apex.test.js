/* jshint node: true, mocha: true, esversion: 6 */
'use strict';

const LambdaTester = require('lambda-tester'),
	expect = require('chai').expect,
	handler = require('../apex').handler;

describe('Apex Tests', function () {

	it('GET /', function () {

		return LambdaTester(handler)

			.expectResult(function (result) {
				expect(result.statusCode).to.equal(200);
				expect('Content-Type', /json/)
				expect(JSON.parse(result.body)).to.have.all.keys(["name", "version"]);
			});

	});

});