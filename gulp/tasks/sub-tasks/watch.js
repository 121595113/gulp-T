import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import watch from 'gulp-watch';

const config = require('../../config.default.js').watch;

gulp.task('watch', () => {
  delete config.changes;
  for (const key in config) {
    if (key !== 'imagemin'){
      gulp.watch(config[key], [key]);
      continue;
    }
    watch(config[key], () => {
      gulpSequence(key)();
    });
  }
});
