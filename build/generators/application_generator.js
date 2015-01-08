"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

var GeneratorBase = require(__dirname + "/base");
var spawn = require("child_process").spawn;

var ApplicationGenerator = (function (GeneratorBase) {
  var ApplicationGenerator = function ApplicationGenerator() {
    GeneratorBase.apply(this, arguments);
  };

  _extends(ApplicationGenerator, GeneratorBase);

  ApplicationGenerator.prototype.run = function () {
    console.log("generating bridges app");
    this.directory("/");
    this.directory("/src");
    this.template("/bridges.js", "/src/bridges.js")();
    this.template("/package.json", "/package.json")();
    this.template("/gulpfile.js", "/gulpfile.js")();
    this.template("/gitignore", "/.gitignore")();

    this.directory("/src/db");
    this.directory("/src/db/migrations");

    this.directory("/src/test");
    this.directory("/src/test/models");
    this.directory("/src/test/integration");

    this.directory("/src/models");
    this.template("/models/index.js", "/src/models/index.js")();

    this.directory("/src/lib");
    this.template("/lib/index.js", "/src/lib/index.js")();

    this.directory("/src/controllers");
    this.template("/controllers/home.js", "/src/controllers/home.js")();

    this.directory("/src/processes");
    this.template("/processes/server.js", "/src/processes/server.js")();

    this.directory("/src/config");
    this.directory("/src/config/initializers");

    this.template("/config/database.js", "/src/config/database.js")();
    this.template("/config/routes.js", "/src/config/routes.js")();

    this.install();
  };

  ApplicationGenerator.prototype.install = function () {
    var _this = this;
    console.log("Running npm install...");
    setTimeout(function () {
      var install = spawn("npm", ["install"], { cwd: _this.projectPath });
      install.stdout.pipe(process.stdout);
      install.stderr.pipe(process.stdout);
      install.on("close", function (code) {
        console.log("Installation complete");
        process.exit(0);
      });
    }, 1000);
  };

  return ApplicationGenerator;
})(GeneratorBase);

module.exports = ApplicationGenerator;