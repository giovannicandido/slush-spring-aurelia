var gulp = require('gulp');
var bundler = require('aurelia-bundler');

var config = {
  force: true,
  packagePath: '.',
  baseUrl: '.',
  configPath: './config.js',
  bundles: {
    "dist/app-build": {
      includes: [
        '[**/*.js]',
        '**/*.html!text',
        '*.css!text'
      ],
      options: {
        inject: true,
        minify: true
      }
    },
    "dist/vendor-build": {
      includes: [
        'aurelia-bootstrapper',
        'aurelia-framework',
        'aurelia-fetch-client',
        'aurelia-router',
        'aurelia-animator-css',
        'aurelia-templating-binding',
        'aurelia-templating-resources',
        'aurelia-templating-router',
        'aurelia-loader-default',
        'aurelia-history-browser',
        'aurelia-logging-console',
        'uikit/css/uikit.min.css!text',
        'uikit/js/components/**/*.js',
        'jquery',
        'uikit',
        'fetch',

      ],
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

gulp.task('bundle', function() {
 return bundler.bundle(config);
});

gulp.task('unbundle', function() {
 return bundler.unbundle(config);
});
