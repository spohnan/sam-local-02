#
#	SAM Local Makefile
#
# If Makefiles aren't your thing think of this as a well 
# tested README for all of the available commands
#

PROFILE := $(if $(PROFILE), $(PROFILE), '')
STACK_NAME := $(if $(STACK_NAME), $(STACK_NAME), 'sam-deployment')

#
# Development Targets
#

api:
	${INFO} "starting api-gateway"
	@sam local start-api

clean:
	${INFO} "cleaning"
	@rm -fr coverage/ packaged.yaml

db-start: env-var-guard-DB_HOME
	${INFO} "starting local dynamodb"
	@java -Djava.library.path=$(DB_HOME)/DynamoDBLocal_lib -jar $(DB_HOME)/DynamoDBLocal.jar -sharedDb

debug:
	${INFO} "debugging api-gateway"
	@sam local start-api -d 5858

lint:
	${INFO} "linting"
	@node_modules/.bin/jshint **/*.js

package: env-var-guard-S3_BUCKET
	${INFO} "packaging"
	@sam package --template-file template.yaml --s3-bucket $(S3_BUCKET) --output-template-file packaged.yaml $(PROFILE)

report: test-coverage
	${INFO} "generating coverage report"
	@open coverage/lcov-report/index.html

test: lint
	${INFO} "testing"
	@node_modules/.bin/_mocha

test-coverage: lint
	${INFO} "test coverage"
	@node_modules/.bin/istanbul cover node_modules/.bin/_mocha -- -- test/**/*

validate:
	${INFO} "validating"
	@sam validate template.yaml

#
# Production/Deployment Targets
#

delete-stack:
	${INFO} "deleting stack $(STACK_NAME)"
	@aws cloudformation delete-stack --stack-name $(STACK_NAME) $(PROFILE)

deploy: package
	${INFO} "deploying"
	@sam deploy --template-file ./packaged.yaml --stack-name $(STACK_NAME) $(PROFILE) --capabilities CAPABILITY_IAM

#
# Misc Support Targets
#

.PHONY: api clean db-start debug lint report test test-coverage validate

env-var-guard-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Environment variable $* must be set"; \
		exit 1; \
	fi

COLOR := "\e[1;34m"
NC := "\e[0m"
INFO := @bash -c '\
  printf $(COLOR); \
  echo "~> $$1"; \
  printf $(NC)' SOME_VALUE