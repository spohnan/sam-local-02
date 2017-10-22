# SAM Local Development Test Project

## SAM Local Project
* https://aws.amazon.com/blogs/aws/new-aws-sam-local-beta-build-and-test-serverless-applications-locally/
* https://github.com/awslabs/aws-sam-local
* http://docs.aws.amazon.com/lambda/latest/dg/test-sam-local.html

## Prerequisites
* Docker
* npm install -g aws-sam-local
* npm install chai istanbul jshint lambda-tester mocha --save-dev

## Prerequisites for local development environment w/debug
* NodeJS 6.10
* http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html

## Package SAM template
    sam package --template-file template.yaml --s3-bucket $MY_BUCKET_NAME --output-template-file packaged.yaml

## Deploy packaged SAM template
    sam deploy --template-file ./packaged.yaml --stack-name $MY_STACK_NAME --capabilities CAPABILITY_IAM