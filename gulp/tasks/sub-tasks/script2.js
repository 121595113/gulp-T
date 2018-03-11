import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
// import plumber from 'gulp-plumber';
const webpack = require('webpack-stream');
const named = require('vinyl-named');

let { src, dest, options } = require('../../config.default.js').webpack;

gulp.task('scripts2', () => {
  return gulp
    .src(src)
    .pipe($.plumber())
    .pipe(named())
    .pipe(webpack(Object.assign({devtool: 'source-map'}, options)))
    .pipe(gulp.dest(dest));
});

gulp.task('scripts2:build', () => {
  return gulp
    .src(src)
    .pipe($.plumber())
    .pipe(named())
    .pipe(webpack(options))
    .pipe($.uglify())
    .pipe(gulp.dest(dest));
});
