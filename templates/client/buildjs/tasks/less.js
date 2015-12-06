var gulp = require('gulp'),
    less = require('gulp-less'),
    plumbler = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    path = require('../paths');

gulp.task('build-less', function(){
  return gulp.src(path.less)
  .pipe(plumbler())
  .pipe(less())
  .pipe(gulp.dest(path.styles))
})
