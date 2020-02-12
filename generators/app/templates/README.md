# Overview

# Yeoman

`yo cloudapp` generates or updates your app

# make

## Local dev

`make dev-server` starts Phoenix in dev mode.

`make dev-db` sets up the postgresql container.  Probably just needs to be done once.

## Testing

`make test` will run the tests.

# Tools

## Homebrew

`brew bundle` installs all the dependencies in the `Brewfile`.  Use this to get `asdf`, `docker`, etc.

## asdf

`asdf install` installs all the dependencies in the `.tool-versions` file.  Use this to get the right version of Elixir and Erlang.

# Docker

The included `Dockerfile` can be used directly with the `docker` command.

The included `docker-compose.yml` and `docker-compose.test.yml` are set up either dev or test environments for you.

# AWS

`make deploy-pipeline` deploys a pipeline to AWS that uses CodeBuild to build this repo into an image in ECR.

# Phoenix

You can directly use `mix` commands.  You might have to mess with the `config/dev.exs` depending on what you're doing.
