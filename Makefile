#
#	SAM Local Makefile
#
# If Makefiles aren't your thing think of this as a well 
# tested README for all of the available commands
#

TEMPLATE := template.yaml

api:
	@sam local start-api

debug:
	@sam local start-api -d 5858

test:
	${INFO} "testing"
	@npm test

validate:
	${INFO} "validating"
	@sam validate $(TEMPLATE)

# ~~~~~~~~~~~~~~~~~~~~~~~~
# Support routines

.PHONY: api debug test validate

COLOR := "\e[1;35m"
NC := "\e[0m"
INFO := @bash -c '\
  printf $(COLOR); \
  echo "~> $$1"; \
  printf $(NC)' SOME_VALUE