import gulp from 'gulp';
const $ = require('gulp-load-plugins')();

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync('./gulp/config' + project+'.js')) {
	config = require('../../config' + project).compass;
}


gulp.task('compass', (callback) => {
    gulp.src(config.development.src)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.compass(config.development.options))
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe($.autoprefixer(config.development.autoprefixer))
        .on('error', () => {})
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(config.development.dest));
        callback();
});
