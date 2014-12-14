var GeneratorBase = require(__dirname+'/base');
var spawn = require('child_process').spawn;

class ApplicationGenerator extends GeneratorBase {

  run() {
    console.log('generating bridges app');
    this.directory('/');
    this.directory('/source');
    this.directory('/source/db');
    this.directory('/source/db/migrations');
    this.directory('/source/test');
    this.directory('/source/test/models');
    this.directory('/source/test/integration');
    this.directory('/source/app');
    this.directory('/source/app/models');
    this.directory('/source/app/lib');
    this.directory('/source/app/controllers');
    this.template('/application_controller.js', '/source/app/controllers/application_controller.js')();
    this.directory('/source/config');
    this.directory('/source/config/initializers');
    this.template('/config/bridges.js', '/source/config/bridges.js')();
    this.template('/config/database.js', '/source/config/database.js')();
    this.template('/config/routes.js', '/source/config/routes.js')();
    this.template('/package.json', '/package.json')();
    this.template('/gulpfile.js', '/gulpfile.js')();
    this.template('/.gitignore', '/gitiginore')();
    this.install();
  }
  
  install() {
    var _this = this;
    console.log('Running npm install...');
    setTimeout(function() {
      var install = spawn('npm', ['install'], {cwd: _this.projectPath});
      install.stdout.pipe(process.stdout);
      install.stderr.pipe(process.stdout);
      install.on('close', function(code) {
        console.log('Installation complete');
        process.exit(0);
      });
    }, 1000);
  }
}

module.exports = ApplicationGenerator;
