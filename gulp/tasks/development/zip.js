import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
// import plumber from 'gulp-plumber';
// import zip from 'gulp-zip';

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync('./gulp/config' + project + '.js')) {
    config = require('../../config' + project).zip;
}

gulp.task('zip', () => {
    return gulp.src(config.src)
        .pipe($.plumber())
        .pipe($.zip(`${config.filename}.zip`))
        .pipe($.md5(10))
        .pipe(gulp.dest(config.dest));
});
