import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
// import plumber from 'gulp-plumber';
// import data from 'gulp-data';
// import pug from 'gulp-pug';
import path from 'path';
import fs from 'fs';
const config = require('../../config.default.js').pug;

gulp.task('pug', () => {
  return gulp.src(config.src)
    .pipe($.plumber())
    .pipe($.data(function(file) {
      let pageData = `${config.data + path.basename(file.path, '.pug')}.json`;
      return fs.existsSync(pageData) ? require(pageData) : '';
    }))
    .pipe($.pug({
      pretty: true
    }))
    .pipe(gulp.dest(config.dest));
});
