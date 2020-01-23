FROM elixir:1.9.4-alpine AS base

# This step installs all the build tools we'll need
RUN apk update \
  && apk upgrade --no-cache \
  && apk add --no-cache \
  nodejs-npm \
  alpine-sdk \
  openssl-dev \
  && mix local.rebar --force \
  && mix local.hex --force

FROM base AS test

ENV MIX_ENV=test

WORKDIR /app
