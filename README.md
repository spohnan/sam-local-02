# SAM Local Development Test Project

## Documentation Links
* https://aws.amazon.com/blogs/aws/new-aws-sam-local-beta-build-and-test-serverless-applications-locally/
* https://github.com/awslabs/aws-sam-local
* http://docs.aws.amazon.com/lambda/latest/dg/test-sam-local.html
* https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
* https://aws.amazon.com/blogs/compute/going-serverless-migrating-an-express-application-to-amazon-api-gateway-and-aws-lambda/
* https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/

## Auth Links
* https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/
* https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens

## Swagger limitation
* https://github.com/awslabs/aws-sam-local/issues/18

## Prerequisites
* AWS CLI
* Docker
* npm install -g aws-sam-local
* npm install
* (Optional) Make

## Prerequisites for local development environment w/debug
* NodeJS 6.10

## Customized Local Settings

Tool locations and settings can be set using an environment file. I use and have .gitignore'd a file called env.sh which is sourced before running commands

    export PATH=~/dev/bin/node/6.10.3/bin:$PATH
    export DB_HOME=~/dev/bin/dynamodb
    export PROFILE="--profile my-profile-name"
    export S3_BUCKET=my-lambda-function-bucket
    export STACK_NAME=sam-demo-stack

## DynamoDbLocal
https://gist.github.com/markusklems/1e7218d76d7583f1f7b3
sudo ifconfig lo0 alias 172.16.123.1

AWS.config.update({
    endpoint: "http://172.16.123.1:8000"
});

sudo ifconfig lo0 -alias 172.16.123.1