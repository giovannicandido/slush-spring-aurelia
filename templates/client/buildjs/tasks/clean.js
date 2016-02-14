var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var stripDebug = require('gulp-strip-debug');

// deletes all files in the output path
gulp.task('clean', function() {
  return gulp.src([paths.output])
    .pipe(stripDebug())
    .pipe(vinylPaths(del));
});
