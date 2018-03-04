import gulp from 'gulp';
import plumber from 'gulp-plumber';

const config = require('../../config.default.js').copy;

gulp.task('copy', (callback) => {
  for (let i in config) {
    gulp.src(config[i].src)
      .pipe(plumber())
      .pipe(gulp.dest(config[i].dest));
  }
  callback();
});
