const src = 'src/pc';
const dest = 'build/pc';
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
    development: {
      notify: false,
      port: 9000,
      // https: true,
      server: {
        baseDir: [src, dest],
        index: 'index.html',
        routes: {
          // '/bower_components': 'bower_components'
        }
      },
      middleware: [...middleware],
      browser: [BS],
      open: 'external' // local, external, ui, ui-external, tunnel or false
    }
  },
  delete: {
    src: [dest]
  },
  html: {
    src: src,
    dest: dest
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
    html: `${src}/**/*.html`,
    images: `${src}/images/**/*.{jpg,jpeg,png,gif}`,
    scripts: `${src}/js/**/*.js`
  },
  sprites: {
    src: src + '/images',
    dest: {
      css: src + '/sass/sprites/',
      image: src + '/images/'
    }
  }
};
