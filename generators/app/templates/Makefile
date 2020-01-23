greet:
	echo "hello, <%= appname %>"

list-stacks:
	aws cloudformation list-stacks

deploy-pipeline:
	aws cloudformation deploy --template-file pipeline.yml --stack-name <%= pipelineStackname %> --capabilities CAPABILITY_NAMED_IAM

delete-pipeline:
	aws cloudformation delete-stack --stack-name <%= pipelineStackname %>

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
