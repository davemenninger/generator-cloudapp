"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-cloudapp:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file([
      "Dockerfile",
      "terraform.tfvars",
      "pipeline.tf",
      "Makefile",
      ".gitignore"
    ]);
  });
});
