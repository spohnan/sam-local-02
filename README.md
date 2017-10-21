# SAM Local Development Test Project

## SAM Local Project
https://github.com/awslabs/aws-sam-local

## Prerequisites

* Docker
* npm install -g aws-sam-local

## Validate YAML template
    sam validate

## Run unit tests
    npm test

## Run local API Gateway
    sam local start-api
Endpoint will be http://localhost:3000

## Invoke a function locally in debug mode on port 5858 
    sam local invoke -d 5858 <function logical id>

## Start local API Gateway in debug mode on port 5858
    sam local start-api -d 5858

## Debugging needs a launch configuration in VS Code
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Attach to SAM Local",
                "type": "node",
                "request": "attach",
                "address": "localhost",
                "port": 5858,
                "localRoot": "${workspaceRoot}",
                "remoteRoot": "/var/task",
                "protocol": "legacy"
            }
        ]
    }

## Package SAM template
    sam package --template-file template.yaml --s3-bucket $MY_BUCKET_NAME --output-template-file packaged.yaml

## Deploy packaged SAM template
    sam deploy --template-file ./packaged.yaml --stack-name $MY_STACK_NAME --capabilities CAPABILITY_IAM