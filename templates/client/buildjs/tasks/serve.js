var gulp = require('gulp');
var browserSync = require('browser-sync');
var paths = require("../paths");

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', function(done) {
  browserSync({
    open: false,
    port: 9000,
    // If you want serve the files with node instead of spring server uncoment this and comment proxy
    //server: {
    //    baseDir: "./"
    //},
    proxy: "http://localhost:8080"
  }, done);
});
