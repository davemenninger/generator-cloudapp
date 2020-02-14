variable "region" {}
variable "appname" {}
variable "githubRepository" {}
variable "github_oauth_token" {}

provider "aws" {
  version = "~> 2.0"
  region  = "${var.region}"
  profile = "tf"
}

module "my_stuff" {
  source = "git::https://github.com/davemenninger/klempner.git?ref=v0.0.1"

  region = "${var.region}"
  appname = "${var.appname}"
  githubRepository = "${var.githubRepository}"
  github_oauth_token = "${var.github_oauth_token}"
}
