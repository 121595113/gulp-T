import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
// import plumber from 'gulp-plumber';
// import uglify from 'gulp-uglify';

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync('./gulp/config' + project + '.js')) {
    config = require('../../config' + project).uglify;
}

gulp.task('scripts', () => {
    return gulp.src(config.src)
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe(gulp.dest(config.dest));
});
