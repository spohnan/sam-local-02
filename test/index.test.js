'use strict';

var expect = require('chai').expect;
var myLambda = require('../index');

describe('myLambda', function () {
	[
		"Richard",
		"rhyatt"
	].forEach(function (validName) {
		it('successful invocation: name=' + validName,
		function (done) {
			var context = {
				succeed: function (result) {
					expect(result.valid).to.be.true;
					done();
				},
				fail: function () {
					done(new Error('never context.fail'));
				}
			}
			myLambda.handler({ name: validName }, context);
		});
	});
	
	[
		"Fred",
		undefined
	].forEach(function (invalidName) {
		it('fail: when name is invalid: name=' + invalidName,
		function (done) {
			var context = {
				succeed: function () {
					done(new Error('never context.succeed'));
				},
				fail: function (err) {
					expect(err.message)
					.to.equal('unknown name');
					done();
				}
			}
			myLambda.handler({ name: invalidName }, context);
		});
	});
});