import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSequence from 'gulp-sequence';

const project = require('../lib/project')();
const config = require('../config' + project).watch;
const reload = browserSync.reload;


/**
 * Start browsersync task and then watch files for changes
 */

gulp.task('app:watch', (callback) => {
    gulpSequence(
        'delete',
        'imagemin', [
            'pug',
            'compass',
            'scripts'
        ],
        'browsersync'
    )(callback);
    gulp.watch(config.changes).on('change', reload).on('error', () => {});

    gulp.watch(config.images, ['imagesmin'])
    gulp.watch(config.pug, ['pug'])
    gulp.watch(config.sass, ['compass'])
    gulp.watch(config.scripts, ['scripts'])
});
