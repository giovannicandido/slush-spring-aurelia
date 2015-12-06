var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumbler = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    path = require('../paths');

gulp.task('build-sass', function(){
  return gulp.src(path.sass)
  .pipe(plumbler())
  .pipe(sass())
  .pipe(gulp.dest(path.styles))
})
