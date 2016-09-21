import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
// import spritesmith from 'gulp.spritesmith';
// import plumber from 'gulp-plumber';
import path from 'path';
const handleErrors = require('../../lib/handleErrors');

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync('./gulp/config' + project + '.js')) {
    config = require('../../config' + project).sprites;
}

const sprite_arg = require('../../lib/sprite_arg')();

/**
 * Generate sprite and css file from PNGs
 */

gulp.task('sprites', () => {
    const imgStreams = {};
    if (sprite_arg['dir_names']) {
        sprite_arg['dir_names'].forEach(function(item, index) {
            imgStreams[item] = gulp.src(`${config.src}/${item}/*.png`)
                .pipe($.plumber())
                .pipe($.spritesmith({
                    cssName: `_${item}.scss`,
                    cssFormat: 'scss',
                    padding: 4,
                    algorithm: sprite_arg.layout,
                    cssOpts: {
                        dir_name: item,
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
                    imgName: `${item}-sprite.png`,
                    imgPath: `../images/${item}-sprite.png`
                }));

            imgStreams[item].img
                .pipe(gulp.dest(config.dest.image));

            imgStreams[item].css
                .pipe(gulp.dest(config.dest.css));
        });
    }
});
