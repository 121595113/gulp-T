'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import cleancss from 'gulp-clean-css';
import del from 'del';
import path from 'path';
import fs from 'fs';
import merge from "merge-stream";

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('pug', () => {
    return gulp.src(['app/_source/pug/**/*.pug', '!app/_source/pug/components/*', '!app/_source/pug/layout/*'])
        .pipe($.plumber())
        .pipe($.data(function(file) {
            let pageData = './app/_source/pug/data/' + path.basename(file.path, '.pug') + '.json';
            if (fs.existsSync(pageData)) {
                return require(pageData);
            } else {
                return require('./app/_source/pug/data/data.json');
            }
        }))
        .pipe($.pug({
            pretty: true
        }))
        .pipe(gulp.dest('app'))
});

gulp.task('pug:build', () => {
    return gulp.src(['app/_source/pug/**/*.pug', '!app/_source/pug/components/*', '!app/_source/pug/layout/*'])
        .pipe($.plumber())
        .pipe($.data(function(file) {
            let pageData = './app/_source/pug/data/' + path.basename(file.path, '.pug') + '.json';
            if (fs.existsSync(pageData)) {
                return require(pageData);
            } else {
                return require('./app/_source/pug/data/data.json');
            }
        }))
        .pipe($.pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('compass', () => {
    gulp.src('app/_source/sass/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.compass({
            import_path: ['app/_source/_function'],
            sass: 'app/_source/sass',
            css: 'app/css',
            image: 'app/images',
            sourcemap: true
        }))
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe($.autoprefixer({ browsers: ['> 1% in CN', 'last 2 versions', 'Firefox ESR','UCAndroid'] }))
        .on('error', () => {})
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
});

gulp.task('compass:build', () => {
    gulp.src('app/_source/sass/**/*.scss')
        .pipe($.plumber())
        .pipe($.compass({
            import_path: ['app/_source/_function'],
            sass: 'app/_source/sass',
            css: 'app/css',
            image: 'app/images'
        }))
        .pipe($.autoprefixer({ browsers: ['> 1% in CN', 'last 2 versions', 'Firefox ESR'] }))
        .pipe(cleancss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('script', () => {
    return gulp.src('app/js/**/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('dist/js/'));
});


gulp.task('imagemin', () => {
    let images1 = gulp.src('app/images/**/*')
        .pipe($.imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images/')),
        images2 = gulp.src('app/*.{ico,png}')
        .pipe($.imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/'));

    return merge(images1, images2);
});

gulp.task('server', ['pug', 'compass'], () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['app'],
            index: 'index.html',
            routes: {
                // '/bower_components': 'bower_components'
            }
        },
        browser: ["google chrome", "chrome"],
        open:'ui'// local, external, ui, ui-external, tunnel or false
    });

    gulp.watch([
        'app/**/*.html',
        'app/images/**/*',
        'app/js/**/*'
    ]).on('change', reload);

    gulp.watch('app/_source/pug/**/*.pug', ['pug'])
    gulp.watch('app/_source/sass/**/*.scss', ['compass'])
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('build', ['pug:build', 'compass:build', 'imagemin', 'script'])

gulp.task('default', ['clean'], () => {
    gulp.start('build')
});

// 帮助说明
gulp.task('help', () => {
    console.log("clean             :清空dist目录");
    console.log("compass           :sass编译");
    console.log("imagemin          :图片压缩");
    console.log("pug               :pug编译");
    console.log("script            :js编译");
    console.log("server            :开发模式 开启实时监听");
    console.log("null       	   :生产模式 打包压缩文件到dist目录");

});
