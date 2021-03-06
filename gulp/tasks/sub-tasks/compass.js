import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
import cleancss from 'gulp-clean-css';

const config = require('../../config.default.js').compass;


gulp.task('compass', (callback) => {
  gulp.src(config.development.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.compass(config.development.options))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.autoprefixer(config.development.autoprefixer))
    .on('error', () => {})
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.development.dest));
  callback();
});

gulp.task('compass:build', () => {
  gulp.src(config.production.src)
    .pipe($.plumber())
    .pipe($.compass(config.production.options))
    .pipe($.autoprefixer(config.production.autoprefixer))
    .pipe(cleancss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(config.production.dest));
});
