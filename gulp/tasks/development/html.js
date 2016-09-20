import gulp from 'gulp';

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync('./gulp/config' + project+'.js')) {
    config = require('../../config' + project).html;
}

gulp.task('html',() => {
    return gulp.src(`${config.src}/*.{html,htm}`)
    .pipe(gulp.dest(config.dest))
});