/* jshint node: true, esversion: 6 */
'use strict';

const API_NAME = "SAM-LOCAL-02",
	API_VERSION = "0.0.1-SNAPSHOT";

exports.handler = (event, context, callback) => {

	var responseBody = {
		"name": API_NAME,
		"version": API_VERSION
	};

	var response = {
		statusCode: 200,
		headers: { "x-custom-header": "my custom header value" },
		body: JSON.stringify(responseBody)
	};

	callback(null, response);

};