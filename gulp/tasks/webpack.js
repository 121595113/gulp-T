import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('webpack', (callback) => {
  gulpSequence(
    'delete',
    'imagemin', [
      'pug',
      'sass',
      'scripts2'
    ],
    'dev-server'
  )(callback);
});

gulp.task('webpack:build', gulpSequence(
  'delete',
  'imagemin', [
    'pug',
    'sass:build',
    'scripts2:build'
  ]
));
