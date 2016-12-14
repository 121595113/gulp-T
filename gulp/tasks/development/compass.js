import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
import cleancss from 'gulp-clean-css';

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

gulp.task('compass:build', (callback) => {
    gulp.src(config.production.src)
        .pipe($.plumber())
        .pipe($.compass(config.production.options))
        .pipe($.autoprefixer(config.production.autoprefixer))
        .pipe(cleancss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(config.production.dest));
});
