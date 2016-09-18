import gulp from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
const handleErrors = require('../../lib/handleErrors');

gulp.task('sass', () => {
    return gulp.src('app/_source/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', handleErrors))
        .pipe(sourcemaps.write('./.map'))
        .pipe(gulp.dest('dist/css'));
});
