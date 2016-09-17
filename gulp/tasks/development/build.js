import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build', gulpSequence(
    'delete',
    'imagemin', [
        'pug',
        'compass',
        'scripts'
    ]
));
