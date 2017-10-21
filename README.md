# SAM Local Development Test Project

## SAM Local Project
https://github.com/awslabs/aws-sam-local

## Prerequisites


## Run unit tests
      npm test

## Run local API Gateway
    sam local start-api
Endpoint will be http://localhost:3000

##Invoke a function locally in debug mode on port 5858 
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