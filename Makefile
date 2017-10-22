#
#	SAM Local Makefile
#
# If Makefiles aren't your thing think of this as a well 
# tested README for all of the available commands
#

TEMPLATE := template.yaml

api:
	${INFO} "starting api-gateway"
	@sam local start-api

debug:
	${INFO} "debugging api-gateway"
	@sam local start-api -d 5858

lint:
	${INFO} "linting"
	@node node_modules/.bin/jshint **/*.js

test: lint
	${INFO} "testing"
	@node node_modules/.bin/mocha

validate:
	${INFO} "validating"
	@sam validate $(TEMPLATE)

# ~~~~~~~~~~~~~~~~~~~~~~~~
# Support routines

.PHONY: api debug lint test validate

COLOR := "\e[1;35m"
NC := "\e[0m"
INFO := @bash -c '\
  printf $(COLOR); \
  echo "~> $$1"; \
  printf $(NC)' SOME_VALUE