import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSequence from 'gulp-sequence';

const project = require('../lib/project')();
const config = require('../config' + project).watch;
const reload = browserSync.reload;

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
        'browsersync',
        'app:watch'
    )(callback);
});

gulp.task('app:watch', () => {
    gulp.watch(config.changes).on('change', reload).on('error', () => {});

    gulp.watch(config.images, ['imagemin'])
    gulp.watch(config.pug, ['pug'])
    gulp.watch(config.sass, ['sass'])
    gulp.watch(config.scripts, ['scripts'])
});

gulp.task('app:build', gulpSequence(
    'delete',
    'imagemin', [
        'pug',
        'sass:build',
        'scripts'
    ]
));
