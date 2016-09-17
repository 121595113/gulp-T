import gulp from 'gulp';
import uglify from 'gulp-uglify';
const project = require('../../lib/project')();
const config = require('../../config'+project).uglify;

gulp.task('scripts', () => {
    return gulp.src(config.src)
        .pipe(uglify(config.options))
        .pipe(gulp.dest(config.dest));
});
