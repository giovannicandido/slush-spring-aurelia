var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    rename   = require('gulp-rename'),
    template = require('gulp-template'),
    inquirer = require('inquirer'),
    gulpFilter = require('gulp-filter'),
    util = require('gulp-util'),
    path = require('path'),
    runSequence = require('run-sequence');

var finished = function(){
    util.log(util.colors.blue('Carefull with build-less and build-sass at the same time, they '  +
    'could overwrite files.', util.colors.green('To disable that edit the file client/buildjs/build.js')));
    util.log(util.colors.blue('Please enter in the client directory and run ',
      util.colors.green('jspm install')));
    util.log(util.colors.blue('See https://github.com/giovannicandido/slush-spring-aurelia/INSTRUCTIONS.MD',
    'for instructions on how to run, build and use this scafoold'))
  };

  function format(string) {
      var username = string.toLowerCase();
      return username.replace(/\s/g, '');
  }

var defaults = (function () {
      var workingDirName = path.basename(process.cwd()),
        homeDir, osUserName, configFile, user, projectLocation = process.cwd();

      if (process.platform === 'win32') {
          homeDir = process.env.USERPROFILE;
          osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
      }
      else {
          homeDir = process.env.HOME || process.env.HOMEPATH;
          osUserName = homeDir && homeDir.split('/').pop() || 'root';
      }

      configFile = path.join(homeDir, '.gitconfig');
      user = {};

      if (require('fs').existsSync(configFile)) {
          user = require('iniparser').parseSync(configFile).user;
      }

      return {
          appName: workingDirName,
          userName: osUserName || format(user.name || ''),
          authorName: user.name || '',
          authorEmail: user.email || '',
          scalaVersion: '2.11.7',
          bootVersion: '1.3.1.RELEASE',
          projectLocation: projectLocation
      };
  })();
var answers = {};
gulp.task('run', function (done) {
  var filterFiles = gulpFilter(['**/**', '!gradle/**']);
  return gulp.src(__dirname + '/templates/**')  // Note use of __dirname to be relative to generator
    .pipe(filterFiles)
    .pipe(template(answers, {
        interpolate: /<%=\s([\s\S]+?)%>/g
      }))                 // Lodash template support
    .pipe(rename(function(file){
      if(file.basename[0] === '@'){
        file.basename = '.' + file.basename.slice(1);
      }
    }))
    .pipe(conflict('./'))                    // Confirms overwrites on file conflicts
    .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
    .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
});

gulp.task('copy-gradle', function(done){
  return gulp.src(__dirname + '/templates/gradle/**')
    .pipe(conflict('./templates/gradle', {defaultChoice: 'n'}))
    .pipe(gulp.dest('./gradle'));
})

gulp.task('copy-src', function(done){
  return gulp.src(__dirname + '/src/**')
    .pipe(conflict('./client/src', {defaultChoice: 'n'}))
    .pipe(gulp.dest('./client/src'));
})

// Lodash tamplate do not work with ES6 copy is need
gulp.task('default', function(done){

  var nonEmpty = function(value){
    return !(value.length === 0 || !value.trim());
  }
  var prompts = [{
          name: 'appName',
          message: 'What the name of project?',
          default: defaults.appName
      }, {
          name: 'appDescription',
          message: 'What the description?'
      }, {
          name: 'appVersion',
          message: 'What the version?',
          default: '0.1.0'
      }, {
          name: 'appAuthor',
          message: 'Name of author?',
          default: defaults.authorName
      }, {
          name: 'appEmail',
          message: 'Author e-mail?',
          default: defaults.authorEmail
      },{
        name: 'scalaVersion',
        message: 'Scala Version',
        default: defaults.scalaVersion
      },{
        name: 'bootVersion',
        message: 'Spring Boot Version',
        default: defaults.bootVersion
      },{
        type: 'confirm', name: 'moveon', message: 'Continue?'
    }];

  inquirer.prompt(prompts,
  function (answersUser) {
    if (!answersUser.moveon) {
      return done();
    }
    answersUser.projectLocation = defaults.projectLocation
    answers = answersUser
    runSequence('run','copy-gradle','copy-src', finished)
  });

})
