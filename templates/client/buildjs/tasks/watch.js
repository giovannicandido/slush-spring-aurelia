var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');

// outputs changes to files to the console
function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve', 'build-dev'], function() {
  // Não compila typescript ao mudar source, porque o IDE irá compilar
  gulp.watch(paths.source, browserSync.reload);
  gulp.watch(paths.html, ['build-html']).on('change', browserSync.reload);
  // allLess is used to watch for all less files and NOT compile the _*.less
  gulp.watch(paths.allLess, ['build-less']).on('change', browserSync.stream);
  gulp.watch(paths.sass, ['build-sass']).on('change', browserSync.stream);
});
