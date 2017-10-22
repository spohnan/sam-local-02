#
#	SAM Local Makefile
#
# If Makefiles aren't your thing think of this as a well 
# tested README for all of the available commands
#

TEMPLATE := template.yaml

# TODO: Both the DB and the NodeJS 6.10 paths will be unique per environment
DB_HOME :=  /Users/aspohn/dev/bin/dynamodb

api:
	${INFO} "starting api-gateway"
	@sam local start-api

clean:
	${INFO} "cleaning"
	@rm -fr coverage/ packaged.yaml

db-start:
	${INFO} "starting local dynamodb"
	@java -Djava.library.path=$(DB_HOME)/DynamoDBLocal_lib -jar $(DB_HOME)/DynamoDBLocal.jar -sharedDb

debug:
	${INFO} "debugging api-gateway"
	@sam local start-api -d 5858

lint:
	${INFO} "linting"
	@node_modules/.bin/jshint **/*.js

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
	@sam validate $(TEMPLATE)

# ~~~~~~~~~~~~~~~~~~~~~~~~
# Support routines

.PHONY: api clean db-start debug lint report test test-coverage validate

COLOR := "\e[1;35m"
NC := "\e[0m"
INFO := @bash -c '\
  printf $(COLOR); \
  echo "~> $$1"; \
  printf $(NC)' SOME_VALUE