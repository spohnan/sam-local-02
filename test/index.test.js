'use strict';

const LambdaTester = require('lambda-tester');
const expect = require('chai').expect;
const myHandler = require('../index').handler;

describe('handler', function () {

	it('test success', function () {

		return LambdaTester(myHandler)
			.event({ name: 'Fred' })
			.expectResult(function (result) {
				expect(result.statusCode).to.equal(200)
			});

	});

});