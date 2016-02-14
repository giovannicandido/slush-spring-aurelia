var gulp = require('gulp');
var Server = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test',['build-test'], function (done) {
    var server = new Server({
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
    });
    server.start(function(e){
        karmaCompleted(e, done)
    });
});

/**
 * Watch for file changes and re-run tests on each change
 */
 gulp.task('tdd',['build-test'], function (done) {
     var server = new Server({
         configFile: __dirname + '/../../karma.conf.js'
     });
     server.start(function(e){
         karmaCompleted(e, done)
     });
 });


function karmaCompleted(karmaResult, done) {
    log('Karma completed');
    if (karmaResult === 1) {
        done('karma: tests failed with code ' + karmaResult);
    } else {
        done();
    }
}

function log(message){
    console.log(message);
}
