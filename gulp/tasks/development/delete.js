import gulp from 'gulp';
import del from 'del';

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync(`./gulp/config${project}.js`)) {
  config = require(`../../config${project}`).delete;
}

/**
 * Delete folders and files
 */
gulp.task('delete', del.bind(null, config.src));
