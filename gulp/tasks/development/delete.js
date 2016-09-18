import gulp from 'gulp';
import del from 'del';
const project = require('../../lib/project')();
const config = require('../../config' + project).delete;

/**
 * Delete folders and files
 */
gulp.task('delete', () => del.bind(null, config.src));
