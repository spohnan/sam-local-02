'use strict';

const config = require('../config');

exports.handler = (event, context, callback) => {

	switch (event.httpMethod) {
		case "GET":
			callback(null, getHandler());
			break;
		default:
			callback(null, { statusCode: 501 });
	}

};

function getHandler() {
	return {
		statusCode: 200,
		headers: {},
		body: JSON.stringify({
			"name": config.API_NAME,
			"version": config.API_VERSION
		})
	};
}