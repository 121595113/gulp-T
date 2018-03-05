import gulp from 'gulp';
import del from 'del';

const config = require('../../config.default.js').delete;

/**
 * Delete folders and files
 */
gulp.task('delete', del.bind(null, config.src, {force: true}));
