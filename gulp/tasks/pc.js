import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('pc', (callback) => {
  gulpSequence(
    'delete',
    'copy',
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
  'copy',
  'imagemin', [
    'html',
    'sass:build',
    'scripts:build'
  ]
));
