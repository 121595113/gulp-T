import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
// import plumber from 'gulp-plumber';
// import imagemin from 'gulp-imagemin';
let merge = require('merge-stream')();
const config = require('../../config.default.js').imagemin;

const exec = require('child_process').exec;

gulp.task('imagemin', cb => {
  exec(`gulp _imagemin --${process.argv.projectName}`, function(err) {
    if (err) return cb(err);
    cb();
  });
});

gulp.task('_imagemin', () => {
  let images = {};
  for (let i in config) {
    images[i] = gulp.src(config[i].src)
      .pipe($.plumber())
      .pipe($.imagemin({
        progressive: true
      }))
      .pipe(gulp.dest(config[i].dest));
    merge.add(images[i]);
  }
  return merge.isEmpty() ? null : merge;
});
