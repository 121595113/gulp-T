import path from 'path';
import fs from 'fs';
import { merge } from 'lodash';

let rootPath = path.resolve('');
let isRoot = fs.existsSync(path.resolve('','./gulp')) && fs.existsSync(path.resolve('','./src'));
if (isRoot) {
  const projectName = require('./lib/project');
  rootPath = path.resolve('', `./src/${projectName()}`);
}

const project = path.resolve(rootPath).split(path.sep).pop() || '';
const src = path.resolve(rootPath, `../${project}`);
const dest = path.resolve(rootPath, `../../build/${project}`);
const BS = process.platform === 'darwin' ? 'google chrome' : 'chrome';

const usrConfigFile = path.resolve(rootPath, './config.gulp.js');
let usrConfig;
if (fs.existsSync(usrConfigFile)) {
  usrConfig = require(usrConfigFile);
}

const proxy = require('http-proxy-middleware');
// 设置代理
const middleware = [
  // proxy('/api', {
  //   target: 'http://172.16.20.35:8080',
  //   changeOrigin: true
  // }),
  // proxy(['/otherServer1', '/otherServer2'], {
  //   target: 'http://172.16.20.35:8080',
  //   changeOrigin: true
  // })
];

module.exports = merge(
  {
    browsersync: {
      notify: false,
      port: 9000,
      // https: true,
      server: {
        baseDir: [src, dest, path.resolve(dest, '../')],
        index: 'index.html',
        routes: {
          // '/bower_components': 'bower_components'
        }
      },
      middleware: [...middleware],
      // proxy: 'http://172.16.13.22:812', //后端服务器地址
      // serveStatic: [src,dest], // 本地文件目录，proxy同server不能同时配置，需改用serveStatic代替
      browser: [BS],
      open: 'ui' // local, external, ui, ui-external, tunnel or false
    },
    copy: {
      pic: {
        src: `${src}/pic/**/*`,
        dest: `${dest}/pic/`
      }
    },
    delete: {
      src: [dest]
    },
    pug: {
      src: [
        `${src}/pug/**/*.pug`,
        `!${src}/pug/components/**/*`,
        `!${src}/pug/layout/**/*`
      ],
      dest: dest,
      data: `${src}/pug/data/`
    },
    html: {
      src: src,
      dest: dest
    },
    compass: {
      development: {
        src: `${src}/sass/**/*.scss`,
        dest: `${src}/css`,
        options: {
          import_path: ['_source/_function'],
          sass: `${src}/sass`,
          css: `${src}/css`,
          image: `${src}/images`,
          sourcemap: true
        },
        autoprefixer: {
          browsers: [
            '> 1% in CN',
            'last 10 versions',
            'Firefox ESR',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
          ],
          cascade: true
        }
      },
      production: {
        src: `${src}/sass/**/*.scss`,
        dest: `${dest}/css`,
        options: {
          import_path: ['_source/_function'],
          sass: `${src}/sass`,
          css: `${dest}/css`,
          image: `${dest}/images`
        },
        autoprefixer: {
          browsers: [
            '> 1% in CN',
            'last 10 versions',
            'Firefox ESR',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
          ],
          cascade: true
        }
      }
    },
    sass: {
      src: `${src}/sass/**/*.scss`,
      dest: `${dest}/css`,
      options: {
        outputStyle: 'compact' //nested expanded compact compressed
      },
      autoprefixer: {
        browsers: [
          '> 1% in CN',
          'last 10 versions',
          'Firefox ESR',
          'safari 5',
          'ie 8',
          'ie 9',
          'opera 12.1',
          'ios 6',
          'android 4'
        ]
      },
      base64: true,
      base64Options: {
        baseDir: `${dest}/css`,
        extensions: ['svg', 'png', /\.jpg#datauri$/i],
        exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
        maxImageSize: 8 * 1024
      }
    },
    imagemin: {
      images: {
        src: `${src}/images/**/*`,
        dest: `${dest}/images/`
      },
      ico: {
        src: `${src}/*.{ico,png}`,
        dest: `${dest}/`
      }
    },
    uglify: {
      src: `${src}/js/**/*.js`,
      dest: `${dest}/js/`
    },
    watch: {
      changes: [
        `${dest}/**/*.html`,
        `${dest}/images/**/*`, // 如果用compass编译sass这里的dest改成src
        `${dest}/css/**/*.css`, // 如果用compass编译sass这里的dest改成src
        `${dest}/js/**/*`
      ],
      sass: `${src}/sass/**/*.scss`,
      pug: `${src}/pug/**/*.pug`,
      html: `${src}/**/*.html`,
      images: `${src}/images/**/*.{jpg,jpeg,png,gif}`,
      scripts: `${src}/js/**/*.js`
    },
    sprites: {
      src: src + '/images',
      dest: {
        css: src + '/_source/sass/sprites/',
        image: src + '/images/'
      }
    },
    zip: {
      src: `${dest}/**/*`,
      filename: project,
      dest: 'build'
    }
  },
  usrConfig || {}
);