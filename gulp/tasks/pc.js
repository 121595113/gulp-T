import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

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
    'dev-server'
  )(callback);
});

gulp.task('pc:build', gulpSequence(
  'delete',
  'imagemin', [
    'html',
    'sass:build',
    'scripts'
  ]
));
