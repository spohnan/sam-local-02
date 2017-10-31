'use strict';

const AWS = require('aws-sdk-mock'),
  LambdaTester = require('lambda-tester'),
  expect = require('chai').expect,
  fx = require('node-fixtures'),
  sinon = require('sinon'),
  uuid = require('node-uuid'),
  handler = require('../functions/opportunity').handler;

const mockId = '00000000-0000-0000-0000-000000000000';

describe('Opportunity GET', function () {

  before(function () {
    AWS.mock('DynamoDB', 'getItem', function (params, callback) {
      callback(null, fx['opportunity-get-result']);
    });
  });

  it('GET /opportunity/' + mockId, function () {

    return LambdaTester(handler)
      .event({
        "httpMethod": "GET",
        "pathParameters": {
          "id": mockId
        }
      })
      .expectResult(function (result) {
        expect(result.statusCode).to.equal(200);
        expect('Content-Type', /json/);
        expect(result.body).to.equal(JSON.stringify(fx['opportunity-get-result']));
      });
  });

  after(function () {
    AWS.restore('DynamoDB', 'getItem');
  });
});

describe('Opportunity POST', function () {
  
    before(function () {
      AWS.mock('DynamoDB', 'putItem', function (params, callback) {
        callback(null, {});
      });
      sinon.stub(uuid, 'v4', function () {
        return mockId;
      });
    });
  
  it('POST /opportunity', function () {
      return LambdaTester(handler)
        .event({
          "httpMethod": "POST",
          "body": JSON.stringify(fx['opportunity-post-body'])
        })
        .expectResult(function (result) {
          expect(result.statusCode).to.equal(201);
          expect('Content-Type', /json/);
          expect(result.body).to.equal(JSON.stringify(fx['opportunity-post-result']));
        });
    });
  
    after(function () {
      AWS.restore('DynamoDB', 'putItem');
      uuid.v4.restore();
    });
  });