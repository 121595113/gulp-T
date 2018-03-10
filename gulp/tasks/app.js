import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('app', (callback) => {
  gulpSequence(
    'delete',
    'imagemin', [
      'pug',
      'sass',
      'scripts'
    ],
    'dev-server'
  )(callback);
});

gulp.task('app:build', gulpSequence(
  'delete',
  'imagemin', [
    'pug',
    'sass:build',
    'scripts:build'
  ]
));
