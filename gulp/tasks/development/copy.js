import gulp from 'gulp';
import plumber from 'gulp-plumber';

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync('./gulp/config' + project + '.js')) {
    config = require('../../config' + project).copy;
}

gulp.task('copy', (callback) => {
    for (let i in config) {
        gulp.src(config[i].src)
            .pipe(plumber())
            .pipe(gulp.dest(config[i].dest))
    }
    callback();
});
