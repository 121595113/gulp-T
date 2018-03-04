import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
// import plumber from 'gulp-plumber';
// import zip from 'gulp-zip';

const config = require('../../config.default.js').zip;

gulp.task('zip', () => {
  return gulp.src(config.src)
    .pipe($.plumber())
    .pipe($.zip(`${config.filename}.zip`))
    .pipe($.md5(10))
    .pipe(gulp.dest(config.dest));
});
