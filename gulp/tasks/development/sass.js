import gulp from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import cleancss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
const handleErrors = require('../../lib/handleErrors');

gulp.task('sass', () => {
    return gulp.src('app/_source/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', handleErrors))
        .pipe(autoprefixer({ browsers: ['> 1% in CN', 'last 10 versions', 'Firefox ESR'] }))
        .pipe(sourcemaps.write('./.map'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:build', () => {
    return gulp.src('app/_source/sass/**/*.scss')
        .pipe(sass().on('error', handleErrors))
        .pipe(autoprefixer({ browsers: ['> 1% in CN', 'last 10 versions', 'Firefox ESR'] }))
        .pipe(cleancss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css'));
});
