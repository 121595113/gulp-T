import path from 'path';
const project = __dirname.split(path.sep).pop() || '';

const src = path.resolve(__dirname);
const dest = path.resolve(__dirname, `../../build/${project}`);
const BS = process.platform === 'darwin' ? 'google chrome' : 'chrome';

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

module.exports = {
  browsersync: {
    notify: false,
    port: 8000,
    // https: true,
    server: {
      baseDir: [src, dest],
      index: 'index.html',
      routes: {
        // '/bower_components': 'bower_components'
      }
    },
    middleware: [...middleware],
    // proxy: 'http://172.16.13.22:812', //后端服务器地址
    // serveStatic: [src,dest], // 本地文件目录，proxy同server不能同时配置，需改用serveStatic代替
    browser: [BS],
    open: 'external' // local, external, ui, ui-external, tunnel or false
  },
  delete: {
    src: [dest]
  },
  pug: {
    src: [`${src}/pug/**/*.pug`, `!${src}/pug/components/**/*`, `!${src}/pug/layout/**/*`],
    dest: dest,
    data: `${src}/pug/data/`,
    charset: 'utf-8'
  },
  sass: {
    src: `${src}/sass/**/*.scss`,
    dest: `${dest}/css`,
    options: {
      outputStyle: 'expanded' //nested expanded compact compressed
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
    base64: {
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
      `${dest}/images/**/*`,
      `${dest}/css/**/*.css`,
      `${dest}/js/**/*`
    ],
    sass: `${src}/sass/**/*.scss`,
    pug: `${src}/pug/**/*.pug`,
    images: `${src}/images/**/*.{jpg,jpeg,png,gif}`,
    scripts: `${src}/js/**/*.js`
  },
  sprites: {
    src: src + '/images',
    dest: {
      css: src + '/sass/sprites/',
      image: src + '/images/'
    }
  },
  zip: {
    src: `${dest}/**/*`,
    filename: project,
    dest: 'build'
  }
};
