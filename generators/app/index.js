"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the tremendous ${chalk.red(
          "generator-cloudapp"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname.replace(/\s+/g, "-"), // Yeoman replaces dashes with spaces. We want dashes.
        store: true
      },
      {
        type: "input",
        name: "githubUser",
        message: "Your github username ( or organization name )",
        default: "whapps",
        store: true
      },
      {
        type: "input",
        name: "githubRepository",
        message: "Your repository name",
        default: this.appname.replace(/\s+/g, "-"), // Yeoman replaces dashes with spaces. We want dashes.
        store: true
      },
      {
        type: "confirm",
        name: "isPhoenix",
        message: "Would you like to generate a phoenix app?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  makeTemplates() {
    this.fs.copyTpl(
      this.templatePath("Makefile"),
      this.destinationPath("Makefile"),
      {
        appname: this.props.name,
        whichMakeTest: this.props.isPhoenix ? "mix-test" : "default-test"
      }
    );
    this.fs.copyTpl(
      this.templatePath("Makefile.aws"),
      this.destinationPath("Makefile.aws"),
      {
        pipelineStackname: this.props.name + "-pipeline",
        clusterStackname: this.props.name + "-cluster"
      }
    );
  }

  cloudTemplates() {
    this.fs.copyTpl(
      this.templatePath("pipeline.yml"),
      this.destinationPath("pipeline.yml"),
      {
        appname: this.props.name,
        githubUser: this.props.githubUser,
        githubRepository: this.props.githubRepository
      }
    );
  }

  dockerTemplates() {
    this.fs.copyTpl(
      this.templatePath("docker-compose.yml"),
      this.destinationPath("docker-compose.yml"),
      {
        appname: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath("docker-compose.test.yml"),
      this.destinationPath("docker-compose.test.yml"),
      {
        appname: this.props.name
      }
    );

    var dockerfile = this.props.isPhoenix
      ? "Dockerfile.phoenix"
      : "Dockerfile.default";
    this.props.phoenixAppname = this.props.name.replace(/-/g, "_");
    this.fs.copyTpl(
      this.templatePath(dockerfile),
      this.destinationPath("Dockerfile"),
      {
        appname: this.props.name,
        phoenixAppname: this.props.phoenixAppname
      }
    );
  }

  dotFiles() {
    this.fs.copyTpl(
      this.templatePath(".travis.yml"),
      this.destinationPath(".travis.yml")
    );
  }

  phoenixGen() {
    if (this.props.isPhoenix) {
      console.log("now going to run mix phx.new for you...");
      this.spawnCommandSync("mix", [
        "phx.new",
        ".",
        "--app",
        this.props.phoenixAppname
      ]);
      console.log(
        "TODO change the hostname in config/test.exs from `localhost` to `db`"
      );
      console.log(
        "TODO comment out the prod.secret.exs import line in prod.exs and rm it"
      );
    }
  }
};
