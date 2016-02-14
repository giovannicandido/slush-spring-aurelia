var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    rename   = require('gulp-rename'),
    template = require('gulp-template'),
    inquirer = require('inquirer'),
    gulpFilter = require('gulp-filter'),
    util = require('gulp-util'),
    path = require('path'),
    runSequence = require('run-sequence'),
    fs = require('fs'),
    _ = require('lodash');
// endsWith function
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
String.prototype.contains = function(other){
  return this.indexOf(other) > 1;
}
var finished = function(){
    util.log(util.colors.blue('Carefull with build-less and build-sass at the same time, they '  +
    'could overwrite files.', util.colors.green('To disable that edit the file client/buildjs/build.js')));
    util.log(util.colors.blue('Please run ',
      util.colors.green('./gradlew initProject')));
    util.log(util.colors.blue('See docs/',
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
          springPlatVersion: '2.0.2.RELEASE',
          projectLocation: projectLocation,
          packageName: 'com.mycompany.product'
      };
  })();
var answers = {};
var filterFiles = [
  '**/**', '!**/*.md','!**/*.MD','!gradle/**',
  '!**/*.jar', '!gradlew', '!gradlew.bat',
  '!client/fonts/**', '!client/images/**','!**/*.jpg','!**/*.png'
];

var packageReplacements = ['info/atende/touch']
gulp.task('run', function (done) {

  return gulp.src(__dirname + '/templates/**')  // Note use of __dirname to be relative to generator
    .pipe(gulpFilter(filterFiles))
    .pipe(template(answers,{
      interpolate: /<%=([\s\S]+?)%>/g
    }))                 // Lodash template support
    .pipe(rename(function(file){
      if(file.basename[0] === '@'){
        file.basename = '.' + file.basename.slice(1);
      }
      // packageName support
      var newPackage = answers.packageName.split('.').join('/');
      for(var i=0;i<packageReplacements.length;i++){
        // startsWith
        if(file.dirname.contains(packageReplacements[i])){
          file.dirname = file.dirname.replace(packageReplacements[i], newPackage)
        }
      }

    }))
    .pipe(gulpFilter(['**','!server/src/**/info','!server/src/**/info/**'])) // Work around to remove the empty packages
    .pipe(conflict('./'))                    // Confirms overwrites on file conflicts
    .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
    .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
});

gulp.task('copy-ignored', function(done){
  var filesToCopyTmp = filterFiles
  filesToCopyTmp.splice(0,1)
  var filesToCopy = filesToCopyTmp.map(function(f){
    return __dirname + '/templates/' + f.substr(1,f.length)
  });

  return gulp.src(filesToCopy, {base: __dirname + '/templates'})
    .pipe(conflict('./', {defaultChoice: 'n'}))
    .pipe(gulp.dest('./'));
})

// Lodash tamplate do not work with ES6 copy is need
gulp.task('default', function(done){

  var nonEmpty = function(value){
    return !(value.length === 0 || !value.trim());
  }
  var prompts = [{
          name: 'appName',
          message: 'What is the name of project?',
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
        name: 'springPlatVersion',
        message: 'Spring Platform Version',
        default: defaults.springPlatVersion
      },{
        name: 'packageName',
        message: 'Root application package',
        default: defaults.packageName,
        validate: function(value){
          var regex = /^([a-z0-9]+\.)?[a-z0-9][a-z0-9-]*(\.[a-z]+)*$/i
          if (regex.test(value)) {
            return true;
          }
          else {
              return value + " is not a domain. The convention is to use a reverse domain without www";
          }
        }
      },{
        type: 'confirm', name: 'moveon', message: 'Continue?'
    }];
  answers = loadPreviousAnswers()
  util.log('These are the previous answers in file', util.colors.green('slush.json'))
  util.log('If not empty, it will be loaded. Except from', util.colors.green('projectLocation'),
    ' that is recalculated with the current folder')
  util.log(answers)
  if(_.isEmpty(answers)){
    inquirer.prompt(prompts,
      function (answersUser) {
        if (!answersUser.moveon) {
          return done();
        }
        answersUser.projectLocation = defaults.projectLocation
        answers = answersUser
        savePreviousAnswers(answers)
        runSequence('run', 'copy-ignored', finished)
      });
  }else{
    answers.projectLocation = defaults.projectLocation
    runSequence('run', 'copy-ignored', finished)
  }
})

function loadPreviousAnswers(){
  console.log('Loading previous answers')
  try {
    var contents = fs.readFileSync('slush.json', 'utf-8')
    if(contents == undefined && contents == null){
      return {}
    }else{
      return JSON.parse(contents)
    }
  } catch (e){
    return {}
  }

}

function savePreviousAnswers(answers) {
  var string = JSON.stringify(answers, null, 4)
  fs.writeFile('slush.json', string);
}
