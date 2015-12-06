var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var paths = require('../paths');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('build-typescript', function(){
  var tsResult = gulp.src(paths.source)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(ts(tsProject, {sortOutput: true}));
  return tsResult.js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.output + paths.root))
});

gulp.task('build-test', function(){
    var tsResult = gulp.src(paths.specSrc)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject, {sortOutput: true}));
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.output))
});

gulp.task('build-html', function(){
   return gulp.src(paths.html)
       .pipe(gulp.dest(paths.output + paths.root))
});
// Carefull with build less and sass at the same time, it could overwrite styles
gulp.task('build-dev', function(callback) {
  return runSequence(
      'clean',
      ['build-typescript', 'build-html', 'build-less', 'build-sass'],
      'copy-font-awesome',
      callback
  );
});
/**
 * Copia os arquivos necessários imitando a hierarquia da pasta client na pasta dist
 * Isso é necessário para o sitema em produção porque o gradle coloca apenas os arquivos da pasta dist como se fosse
 * o web root do aplicativo.
 * Ou seja, todos os arquivos que estiverem na pasta client e que sejam necessários para a interface devem ser copiados
 * para a pasta dist
 */
gulp.task('copy-resources', function(){
    // SystemJS
    gulp.src(['jspm_packages/**'])
           .pipe(gulp.dest(paths.output + 'jspm_packages/'));
    // Styles
    gulp.src(paths.styles + "/**/*.css").pipe(gulp.dest(paths.output + paths.styles));
    // JS Folder
    gulp.src('js/**/*.js').pipe(gulp.dest(paths.output + 'js/'));
    // config.js
    gulp.src('config.js').pipe(gulp.dest(paths.output));
    // images
    gulp.src('images/**').pipe(gulp.dest(paths.output + 'images/'));
    // Fonts
    gulp.src('fonts/**').pile(gulp.dest(paths.output + 'fonts/'));

});

// Keep bower font-awesome in sync
gulp.task('copy-font-awesome',function(){
  gulp.src('bower_components/font-awesome/fonts/**')
     .pipe(gulp.dest('./fonts/'))
});


gulp.task('build', function(callback) {
  return runSequence(
      'clean',
      ['build-typescript', 'build-html', 'build-less'],
      'copy-font-awesome',
      'copy-resources',
      'bundle',
      callback
  );
});
