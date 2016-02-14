var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';
var allLess = 'less/**/*.less'

module.exports = {
  root: appRoot,
  source: [appRoot + '**/*.ts','**/*.d.ts','!node_modules/**/*.d.ts'],
  html: appRoot + '**/*.html',
  sass: appRoot + 'scss/**/*.scss',
  less: [allLess,'!less/**/_*.less'],
  allLess: allLess,
  styles: 'styles/',
  output: outputRoot,
  appOutput: outputRoot + '/app',
  doc:'./doc',
  specSrc: ['test/**/*.ts', '**/*.d.ts','!node_modules/**/*.d.ts'],
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
