/* jshint node: true, esversion: 6 */
'use strict';

const API_NAME = "SAM-LOCAL-02",
	API_VERSION = "0.0.1-SNAPSHOT";

exports.handler = (event, context, callback) => {

	switch (event.httpMethod) {

		case "GET":

			var responseBody = {
				"name": API_NAME,
				"version": API_VERSION
			};

			callback(null, {
				statusCode: 200,
				headers: {},
				body: JSON.stringify(responseBody)
			});

			break;

		default:
			callback(null, { statusCode: 501 });

	}

};