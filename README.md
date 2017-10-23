# SAM Local Development Test Project

## Documentation Links
* https://aws.amazon.com/blogs/aws/new-aws-sam-local-beta-build-and-test-serverless-applications-locally/
* https://github.com/awslabs/aws-sam-local
* http://docs.aws.amazon.com/lambda/latest/dg/test-sam-local.html

## Prerequisites
* Docker
* npm install -g aws-sam-local
* AWS CLI

## Prerequisites for local development environment w/debug
* NodeJS 6.10
* http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html

## Customized Local Settings

Tool locations and settings can be set using an environment file. I use and have .gitignore'd a file called env.sh which is sourced before running commands

    export PATH=~/dev/bin/node/6.10.3/bin:$PATH
    export DB_HOME=~/dev/bin/dynamodb
    export PROFILE="--profile my-profile-name"
    export S3_BUCKET=my-lambda-function-bucket
    export STACK_NAME=sam-demo-stack