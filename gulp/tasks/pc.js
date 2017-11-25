import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSequence from 'gulp-sequence';

const project = require('../lib/project')();
const config = require(`../config${project}`).watch;
const reload = browserSync.reload;

/**
 * Start browsersync task and then watch files for changes
 */

gulp.task('pc', (callback) => {
  gulpSequence(
    'delete',
    'imagemin', [
      'html',
      'sass',
      'scripts'
    ],
    'browsersync',
    'pc:watch'
  )(callback);
});

gulp.task('pc:watch', () => {
  gulp.watch(config.changes).on('change', reload).on('error', () => {});

  gulp.watch(config.images, ['imagemin']);
  gulp.watch(config.html, ['html']);
  gulp.watch(config.sass, ['sass']);
  gulp.watch(config.scripts, ['scripts']);
});

gulp.task('pc:build', gulpSequence(
  'delete',
  'imagemin', [
    'html',
    'sass:build',
    'scripts'
  ]
));
