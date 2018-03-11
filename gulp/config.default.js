import path from 'path';
import fs from 'fs';

let rootOfProject = path.resolve('');
let rootOfGulp = path.resolve(__dirname, '../');
let projectName = path.relative(rootOfGulp, rootOfProject).replace('src/', '');
let isRoot = projectName === '';
if (isRoot) {
  projectName = require('./lib/project')();
}
process.argv.rootOfGulp = rootOfGulp;
process.argv.projectName = projectName;

const src = path.resolve(rootOfGulp, `./src/${projectName}`);
const dest = path.resolve(rootOfGulp, `./build/${projectName}`);
const BS = process.platform === 'darwin' ? 'google chrome' : 'chrome';

const usrConfigFile = path.resolve(src, './config.gulp.js');
let usrConfig = {};
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

let configs = {
  browsersync: {
    notify: false,
    port: 9000,
    // https: true,
    server: {
      baseDir: [src, dest, path.resolve(rootOfGulp, './build')],
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
  webpack: {
    src: `${src}/*/!(_)*.js`,
    dest: `${dest}/js/`,
    options: {
      // devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.(png|jpg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'images/[name]-[hash:8].[ext]'
                }
              }
            ]
          }
        ]
      }
    }
  },
  watch: {
    changes: [
      `${dest}/**/*.{html, htm}`,
      `${dest}/images/**/*`, // 如果用compass编译sass这里的dest改成src
      `${dest}/css/**/*.css`, // 如果用compass编译sass这里的dest改成src
      `${dest}/js/**/*`
    ],
    tasks: ['sass', 'pug', 'html', 'imagemin', 'scripts'],
    _tasks: {
      sass: `${src}/sass/**/*.scss`,
      pug: `${src}/pug/**/*.pug`,
      html: [`${src}/**/*.html`, `${src}/**/*.htm`],
      imagemin: `${src}/images/**/*.{jpg,jpeg,png,gif}`,
      scripts: `${src}/js/**/*.js`,
      scripts2: `${src}/*/**/*.js`
    }
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
    filename: projectName.split('/').pop(),
    dest: path.resolve(dest, '../')
  }
};
for (const key in usrConfig) {
  if (typeof configs[key] === 'object') {
    Object.assign(configs[key], usrConfig[key]);
    continue;
  }
  configs[key] = usrConfig[key];
}

module.exports = configs;
