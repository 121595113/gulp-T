import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import merge from 'merge-stream';
const project = require('../../lib/project')();
const config = require('../../config'+project).imagemin;

gulp.task('imagemin', () => {
    let images1 = gulp.src(config.src)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.dest)),
        images2 = gulp.src(config.srcico)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.destico));

    return merge(images1, images2);
});