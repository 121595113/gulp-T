import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import compass from 'gulp-compass';
import autoprefixer from 'gulp-autoprefixer';
const project = require('../../lib/project')();
const config = require('../../config' + project).compass;


gulp.task('compass', () => {
    gulp.src(config.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(compass(config.options))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer(config.autoprefixer))
        .on('error', () => {})
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest))
});
