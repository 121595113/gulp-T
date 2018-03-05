import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
import cleancss from 'gulp-clean-css';
// import sass from 'gulp-sass';
// import plumber from 'gulp-plumber';
// import sourcemaps from 'gulp-sourcemaps';
// import autoprefixer from 'gulp-autoprefixer';
// import base64 from 'gulp-base64';
const handleErrors = require('../../lib/handleErrors');

const config = require('../../config.default.js').sass;

gulp.task('sass', () => {
  return gulp.src(config.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass(config.options).on('error', handleErrors))
    .pipe($.autoprefixer(config.autoprefixer))
    .pipe($.sourcemaps.write('./.map'))
    .pipe(gulp.dest(config.dest));
});

gulp.task('sass:build', () => {
  let sassBuild$ = gulp.src(config.src)
    .pipe($.plumber())
    .pipe($.sass().on('error', handleErrors))
    .pipe($.autoprefixer(config.autoprefixer))
    .pipe(cleancss({
      compatibility: 'ie8'
    }));

  if (!!config.base64) {
    sassBuild$ = sassBuild$
      .pipe($.base64(config.base64Options))
      .pipe(cleancss({
        compatibility: 'ie8'
      }));
  }

  return sassBuild$.pipe(gulp.dest(config.dest));
});
