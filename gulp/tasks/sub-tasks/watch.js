import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSequence from 'gulp-sequence';
import { debounce } from 'lodash';
import watch from 'gulp-watch';

const config = require('../../config.default.js').watch;
const reload = browserSync.reload;

gulp.task('watch', () => {
  gulp.watch(config.changes).on('change', debounce(reload, 500)).on('error', () => {});
  for (const key in config) {
    if (key === 'changes') continue;
    if (key !== 'imagemin'){
      gulp.watch(config[key], [key]);
      continue;
    }
    watch(config[key], () => {
      gulpSequence(key)();
    });
  }
});
