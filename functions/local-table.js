'use strict';

const aws = require('aws-sdk'),
  config = require('../config'),
  dbConfig = { apiVersion: '2012-08-10' },
  NOT_FOUND = -1;

if (process.env.AWS_SAM_LOCAL) { dbConfig.endpoint = config.LOCAL_DB_ENDPOINT; }
const db = new aws.DynamoDB(dbConfig);

exports.handler = (event, context, callback) => {
  switch (event.httpMethod) {
    case "POST":
      postHandler(event, context, callback);
      break;
    default:
      callback(null, { statusCode: 501 });
  }
};

function postHandler(event, context, callback) {
  var params = {};
  db.listTables(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(null, {
        statusCode: 500,
        headers: {},
        body:  JSON.stringify({ "error": "Error encountered while trying to create table " + config.TABLE_NAME })
      });
    } else {

      if (data.TableNames.indexOf(config.TABLE_NAME) != NOT_FOUND) {

        callback(null, {
          statusCode: 422,
          body: JSON.stringify({ error: "Table " + config.TABLE_NAME + " already exists"})
        });

      } else {

        params = {
          TableName: config.TABLE_NAME,
          KeySchema: [
            { AttributeName: "icf_biz_opp_id", KeyType: "HASH" }
          ],
          AttributeDefinitions: [
            { AttributeName: "icf_biz_opp_id", AttributeType: "S" }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        };

        db.createTable(params, function (err) {
          if(!err) {
            callback(null, {
              statusCode: 201,
              body: JSON.stringify({ error: "Table " + config.TABLE_NAME + " created"})
            });
          } else {
            console.log(err, err.stack);
            callback(null, {
              statusCode: 500,
              body: JSON.stringify({ "error": "Error encountered while trying to create table " + config.TABLE_NAME })
            });
          }
        });
      }
    }

  });
}