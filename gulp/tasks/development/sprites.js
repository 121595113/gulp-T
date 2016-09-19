import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import plumber from 'gulp-plumber';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
import path from 'path';
const handleErrors = require('../../lib/handleErrors');
const project = require('../../lib/project')();
const config = require('../../config' + project).sprites;

const sprite_arg = require('../../lib/sprite_arg')();
console.log(sprite_arg);
/**
 * Generate sprite and css file from PNGs
 */

 gulp.task('sprites', () => {
     const imgStreams = {};
     imgStreams['spriteData'] = gulp.src(config.src)
         .pipe(spritesmith({
             cssName: '_sprites.scss',
             cssFormat: 'scss',
             padding :4,
             cssOpts: {
                dir_name:'cur',
                // cssSelector: function(item) {
                //     // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                //     if (item.name.indexOf('-hover') !== -1) {
                //         return '.icon-' + item.name.replace('-hover', ':hover');
                //         // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                //     } else {
                //         return '.icon-' + item.name;
                //     }
                // }
             },
             cssTemplate: path.resolve('./gulp/lib/handlebarsInheritance.scss.handlebars'),
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
             padding :4,
             cssOpts: {
                dir_name:'cur1'
             },
             cssTemplate: path.resolve('./gulp/lib/handlebarsInheritance.scss.handlebars'),
             imgName: 'cur1-sprite.png',
             imgPath: '../images/cur1-sprite.png'
         }));

     imgStreams['spriteData_1'].img
         .pipe(buffer())
         .pipe(gulp.dest(config.dest.image));

     imgStreams['spriteData_1'].css
         .pipe(buffer())
         .pipe(gulp.dest(config.dest.css));
 });

