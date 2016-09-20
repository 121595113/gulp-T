import gulp from 'gulp';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import merge from 'merge-stream';

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync('./gulp/config' + project + '.js')) {
    config = require('../../config' + project).imagemin;
}

gulp.task('imagemin', () => {
    let images1 = gulp.src(config.src)
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.dest)),
        images2 = gulp.src(config.srcico)
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.destico));

    return merge(images1, images2);
});
