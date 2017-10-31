'use strict';

const aws = require('aws-sdk'),
  config = require('../config'),
  dbConfig = { apiVersion: '2012-08-10' },
  sanitize = require('he'),
  uuid = require('node-uuid');
  
if (process.env.AWS_SAM_LOCAL) { dbConfig.endpoint = config.LOCAL_DB_ENDPOINT; }
const db = new aws.DynamoDB(dbConfig);

exports.handler = (event, context, callback) => {
  switch (event.httpMethod) {
    case "GET":
      getHandler(event, context, callback);
      break;
    case "POST":
      postHandler(event, context, callback);
      break;
    default:
      callback(null, { statusCode: 501 });
  }
};

function getHandler(event, context, callback) {
  var params = {
    Key: {
      "icf_biz_opp_id": { 
        S: sanitize.encode(event.pathParameters.id) 
      }
    },
    TableName: config.TABLE_NAME
  };

  var promise = db.getItem(params).promise();
  promise.then(function (data) {
    callback(null, {
      statusCode: 201,
      headers: {},
      body: JSON.stringify(data)
    });
  }).catch(function (err) {
    console.log(err.stack);
    callback(null, {
      statusCode: 500,
      headers: {},
      body: JSON.stringify({ "error": "Error encountered while trying to add opportunity" })
    });
  });
}

function postHandler(event, context, callback) {
  var i = JSON.parse(event.body);
  i.icf_biz_opp_id = uuid.v1();
  i.links = [{
    "rel": "self",
    "href": "/opportunity/" + i.icf_biz_opp_id
  }];

  var params = {
    TableName: config.TABLE_NAME,
    Item: {
      "icf_biz_opp_id": { S: i.icf_biz_opp_id },
      "contracting_office": { S: sanitize.encode(i.contracting_office) },
      "fbo_gov_permanent_weblink": { S: sanitize.encode(i.fbo_gov_permanent_weblink) },
      "naics": { S: sanitize.encode(i.naics) },
      "notice_date": { S: sanitize.encode(i.notice_date) },
      "notice_type": { S: sanitize.encode(i.notice_type) },
      "opp_description": { S: sanitize.encode(i.opp_description) },
      "opp_fbodaily_weblink": { S: sanitize.encode(i.opp_fbodaily_weblink) },
      "opp_publish_date": { S: sanitize.encode(i.opp_publish_date) },
      "opp_title": { S: sanitize.encode(i.opp_title) },
      "poc_name_phone_email": { S: sanitize.encode(i.poc_name_phone_email) },
      "small_business_set_aside": { S: sanitize.encode(i.small_business_set_aside) },
      "solicitation_number": { S: sanitize.encode(i.solicitation_number) }
    }
  };

  var promise = db.putItem(params).promise();
  promise.then(function (data) {
    callback(null, {
      statusCode: 201,
      headers: {},
      body: JSON.stringify(i)
    });
  }).catch(function (err) {
    console.log(err, err.stack);
    callback(null, {
      statusCode: 500,
      headers: {},
      body: JSON.stringify({ "error": "Error encountered while trying to add opportunity" })
    });
  });
}