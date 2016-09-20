import gulp from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import cleancss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import base64 from 'gulp-base64';
const handleErrors = require('../../lib/handleErrors');

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync('./gulp/config' + project + '.js')) {
    config = require('../../config' + project).sass;
}

gulp.task('sass', () => {
    return gulp.src(config.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass(config.options).on('error', handleErrors))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(sourcemaps.write('./.map'))
        .pipe(gulp.dest(config.dest));
});

gulp.task('sass:build', () => {
    if (!!config.base64) {
        return gulp.src(config.src)
            .pipe(plumber())
            .pipe(sass().on('error', handleErrors))
            .pipe(autoprefixer(config.autoprefixer))
            .pipe(cleancss({
                compatibility: 'ie8'
            }))
            .pipe(base64(config.base64))
            .pipe(gulp.dest(config.dest))
    } else {
        return gulp.src(config.src)
            .pipe(plumber())
            .pipe(sass().on('error', handleErrors))
            .pipe(autoprefixer(config.autoprefixer))
            .pipe(cleancss({
                compatibility: 'ie8'
            }))
            .pipe(gulp.dest(config.dest))
    }
});
