import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import browserSync from 'browser-sync';
import { debounce } from 'lodash';

const config = require('../../config.default.js').watch;
const reload = browserSync.reload;

gulp.task('dev-server', (callback)=>{
  gulp.watch(config.changes).on('change', debounce(reload, 500)).on('error', () => {});
  gulpSequence('browsersync', 'watch')(callback);
});
