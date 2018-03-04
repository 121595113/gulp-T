import gulp from 'gulp';
import browserSync from 'browser-sync';

const config = require('../../config.default.js').browsersync;

/**
 * Run the build task and start a server with BrowserSync
 */
gulp.task('browsersync', () => {
  browserSync(config);
});
