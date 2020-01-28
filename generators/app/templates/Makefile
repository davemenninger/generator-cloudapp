.PHONY: all greet test default-test mix-test

all: greet

greet:
	@ echo "hello, <%= appname %>"

yo-regen:
	yo cloudapp

test: <%= whichMakeTest %>

default-test:
	docker-compose run <%= appname %>_tests echo "ok"
	docker-compose down

mix-test:
	docker-compose run <%= appname %>_tests mix do deps.get, deps.compile, compile
	docker-compose run <%= appname %>_tests mix ecto.create
	docker-compose run <%= appname %>_tests mix ecto.migrate
	docker-compose run <%= appname %>_tests mix test
	docker-compose down

-include Makefile.aws
