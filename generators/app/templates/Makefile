.PHONY: all greet test default-test mix-test

all: greet

greet:
	@ echo "hello, <%= appname %>"

yo-regen:
	yo cloudapp

dev-server:
	docker-compose -f docker-compose.yml run --service-ports <%= appname %>_dev mix phx.server

dev-db:
	docker-compose -f docker-compose.yml run <%= appname %>_dev mix ecto.create

test: <%= whichMakeTest %>

default-test:
	docker-compose -f docker-compose.test.yml run <%= appname %>_tests echo "ok"
	docker-compose -f docker-compose.test.yml down

mix-test:
	docker-compose -f docker-compose.test.yml run <%= appname %>_tests mix do deps.get, deps.compile, compile
	docker-compose -f docker-compose.test.yml run <%= appname %>_tests mix ecto.create
	docker-compose -f docker-compose.test.yml run <%= appname %>_tests mix ecto.migrate
	docker-compose -f docker-compose.test.yml run <%= appname %>_tests mix test
	docker-compose -f docker-compose.test.yml down

-include Makefile.terraform
