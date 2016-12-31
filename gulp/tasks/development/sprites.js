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
                        dir_name: item
                    },
                    cssTemplate: path.resolve('./gulp/lib/handlebarsInheritance.scss.handlebars'),
                    imgName: `${item}-sprite.png`,
                    imgPath: `../images/${item}-sprite.png`
                }));

            imgStreams[item].img
                .pipe(gulp.dest(config.dest.image));

            imgStreams[item].css
                .pipe($.replace(/\/\*[^]*\*\/\n/mg, ''))
                .pipe($.replace(/('\b.*)-(active'|hover')/g, '$1:$2'))
                .pipe(gulp.dest(config.dest.css));
        });
    }
});
