import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
// import plumber from 'gulp-plumber';
// import uglify from 'gulp-uglify';

const config = require('../../config.default.js').uglify;

gulp.task('scripts', () => {
  return gulp.src(config.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./.map'))
    .pipe(gulp.dest(config.dest));
});

gulp.task('scripts:build', () => {
  return gulp.src(config.src)
    .pipe($.plumber())
    .pipe($.babel())
    .pipe($.uglify())
    .pipe(gulp.dest(config.dest));
});
