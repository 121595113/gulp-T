import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
// import spritesmith from 'gulp.spritesmith';
// import plumber from 'gulp-plumber';
import path from 'path';

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync(`./gulp/config${project}.js`)) {
  config = require(`../../config${project}`).sprites;
}

const sprite_arg = require('../../lib/sprite_arg')();

/**
 * Generate sprite and css file from PNGs
 */

gulp.task('sprites', () => {
  const imgStreams = {};
  const dirNames = sprite_arg['dir_names'];
  dirNames && dirNames.forEach((item, index) => {
    const files = fs.readdirSync(`${config.src}/${item}`);
    let retina = null;
    let timeStamp = new Date().valueOf();

    for (let i = 0; i < files.length; i++) {
      if (retina) break;
      if (/@2x\.png$/i.test(files[i])) {
        retina = true;
      }
    }

    imgStreams[item] = gulp.src(`${config.src}/${item}/*.png`)
      .pipe($.plumber())
      .pipe($.spritesmith(Object.assign({
        cssName: `_${item}.scss`,
        cssFormat: 'scss',
        padding: 4,
        algorithm: sprite_arg.layout,
        cssOpts: {
          dir_name: item
        },
        cssTemplate: path.resolve('./gulp/lib/handlebarsInheritance.scss.handlebars'),
        imgName: `${item}-sprite.png`,
        imgPath: `../images/${item}-sprite.png?${timeStamp}`,
      }, retina ? {
        retinaSrcFilter: `${config.src}/${item}/*@2x.png`,
        cssOpts: {
          dir_name: item,
          retinaImgPath: `../images/${item}-sprite@2x.png?${timeStamp}`
        },
        retinaImgName: `${item}-sprite@2x.png`,
      } : {})));

    imgStreams[item].img
      .pipe(gulp.dest(config.dest.image));

    imgStreams[item].css
      .pipe($.replace(/(\/\/.*\n)|^\n|(\/\*[\s\S]*\*\/\n)/mg, ''))
      .pipe($.replace(/('\b.*)-(active'|hover')/g, '$1:$2'))
      .pipe(gulp.dest(config.dest.css));
  });
});
