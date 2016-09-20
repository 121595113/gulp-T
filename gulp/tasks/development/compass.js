import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import compass from 'gulp-compass';
import autoprefixer from 'gulp-autoprefixer';

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync('./gulp/config' + project+'.js')) {
	config = require('../../config' + project).compass;
}


gulp.task('compass', () => {
    gulp.src(config.development.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(compass(config.development.options))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer(config.development.autoprefixer))
        .on('error', () => {})
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.development.dest));
});
