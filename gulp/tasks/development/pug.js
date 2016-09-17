import gulp from 'gulp';
import plumber from 'gulp-plumber';
import data from 'gulp-data';
import pug from 'gulp-pug';
import path from 'path';
import fs from 'fs';
const project = require('../../lib/project')();
const config = require('../../config'+project).pug;
gulp.task('pug', () => {
    return gulp.src(config.src)
        .pipe(plumber())
        .pipe(data(function(file) {
            let pageData = './' + config.data + path.basename(file.path, '.pug') + '.json';
            if (fs.existsSync(pageData)) {
                return require('../../.' + pageData);
            } else {
                return require('../../../' + config.data + 'data.json');
            }
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(config.dest))
});
