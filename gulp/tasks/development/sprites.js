import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import plumber from 'gulp-plumber';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
import path from 'path';
const handleErrors = require('../../lib/handleErrors');
const project = require('../../lib/project')();
const config = require('../../config' + project).sprites;

/**
 * Generate sprite and css file from PNGs
 */
gulp.task('sprites', () => {
    const imgStreams = {};
    imgStreams['spriteData'] = gulp.src(config.src)
        .pipe(spritesmith({
            cssName: '_sprites.scss',
            cssFormat: 'scss',
            cssOpts: {
                cssSelector: function(item) {
                    // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                    if (item.name.indexOf('-hover') !== -1) {
                        return '.icon-' + item.name.replace('-hover', ':hover');
                        // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                    } else {
                        return '.icon-' + item.name;
                    }
                }
            },
            imgName: 'cur-sprite.png',
            imgPath: '../images/cur-sprite.png'
        }));

    imgStreams['spriteData'].img
        .pipe(gulp.dest(config.dest.image));

    imgStreams['spriteData'].css
        .pipe(gulp.dest(config.dest.css));
    imgStreams['spriteData_1'] = gulp.src('app/images/cur1/*.png')
        .pipe(spritesmith({
            cssName: '_sprites1.scss',
            cssFormat: 'scss',
            cssOpts: {
                cssSelector: function(item) {
                    // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                    if (item.name.indexOf('-hover') !== -1) {
                        return '.icon-' + item.name.replace('-hover', ':hover');
                        // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                    } else {
                        return '.icon-' + item.name;
                    }
                }
            },
            imgName: 'cur1-sprite.png',
            imgPath: '../images/cur1-sprite.png'
        }));

    imgStreams['spriteData_1'].img
        .pipe(gulp.dest(config.dest.image));

    imgStreams['spriteData_1'].css
        .pipe(gulp.dest(config.dest.css));
    // return merge([imgStream, cssStream]);
});


// gulp.task('sprites', function() {
//     var spriteData = gulp.src('app/images/cur/*.png')
//         .pipe(plumber(handleErrors))
//         // 自动合并精灵图
//         .pipe(spritesmith({
//             cssName: 'sprites.css',
//             imgName: 'sprites.png',
//             // 指定css模板，根据模板生成对应的css代码
//             cssTemplate: path.resolve('./gulp/lib/template.css.handlebars')
//         }));

//     var imgStream = spriteData.img
//         .pipe(buffer())
//         .pipe(gulp.dest('app/images/'));

//     var cssStream = spriteData.css
//         .pipe(gulp.dest('dist/css/'));

//     // 将多个流合并，然后统一返回，这个是很重要功能
//     return merge([imgStream, cssStream]);
// });
