import gulp from 'gulp';
import plumber from 'gulp-plumber';

const config = require('../../config.default.js').html;

gulp.task('html', () => {
  return gulp.src(`${config.src}/**/*.{html,htm}`)
    .pipe(plumber())
    .pipe(gulp.dest(config.dest));
});
