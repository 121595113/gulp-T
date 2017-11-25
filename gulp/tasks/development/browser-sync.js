import gulp from 'gulp';
import browserSync from 'browser-sync';

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync(`./gulp/config${project}.js`)) {
  config = require(`../../config${project}`).browsersync;
}

/**
 * Run the build task and start a server with BrowserSync
 */
gulp.task('browsersync', () => {
  browserSync(config.development);
});
