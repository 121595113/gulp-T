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
        sprite_arg['dir_names'].forEach((item, index) => {

            const files = fs.readdirSync(`${config.src}/${item}`);
            let retina = null;

            for (let i = 0;i < files.length;i++) {
               if (retina) break;
               if (/@2x\.png$/i.test(files[i])){
                retina = true;
               }
            }

            if (retina){
                imgStreams[item] = gulp.src(`${config.src}/${item}/*.png`)
                    .pipe($.plumber())
                    .pipe($.spritesmith({
                        retinaSrcFilter: `${config.src}/${item}/*@2x.png`,
                        cssName: `_${item}.scss`,
                        cssFormat: 'scss',
                        padding: 4,
                        algorithm: sprite_arg.layout,
                        cssOpts: {
                            dir_name: item,
                            retinaImgPath: `../images/${item}-sprite@2x.png?${new Date().valueOf()}`
                        },
                        cssTemplate: path.resolve('./gulp/lib/handlebarsInheritance.scss.handlebars'),
                        imgName: `${item}-sprite.png`,
                        retinaImgName: `${item}-sprite@2x.png`,
                        imgPath: `../images/${item}-sprite.png?${new Date().valueOf()}`
                    }));
            }else{
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
                        imgPath: `../images/${item}-sprite.png?${new Date().valueOf()}`,
                    }));
            }

            imgStreams[item].img
                .pipe(gulp.dest(config.dest.image));

            imgStreams[item].css
                .pipe($.replace(/\/\*[^]*\*\/\n/mg, ''))
                .pipe($.replace(/('\b.*)-(active'|hover')/g, '$1:$2'))
                .pipe(gulp.dest(config.dest.css));
        });
    }
});
