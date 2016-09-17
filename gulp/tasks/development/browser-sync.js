import gulp from 'gulp';
import browserSync from 'browser-sync';
const project = require('../../lib/project')();
const config_b = require('../../config' + project).browsersync.development;

/**
 * Run the build task and start a server with BrowserSync
 */
gulp.task('browsersync', () => {
    browserSync(config_b);
});
