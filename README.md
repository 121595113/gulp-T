# gulp-T 多项目管理
Long, long ago... Gulp都是一堆依赖包只对应一个项目，很难一个gulp配置文件用在多个项目的情况。本项目就是为了解决这个痛点而整合出来的。其中融入了作者大量的心血，可谓扩展性高、配置文件复用强、配置简单的gulp案例，而且还加入一些好用的task，比如精灵图支持多张图片的合成，合图后css可以采用rem单位，图片按需转换成base64...

## 下载
```
git clone https://github.com/121595113/gulp-T.git
```
## 使用方法

### 一、安装依赖包
```
npm install
```
### 二、开发模式
*如无特殊说明以下都以app项目为例*
```
gulp app --app // 其中app为项目读取配置文件所需参数名，配置文件路径'gulp/config.app.js'
```
### 三、生产模式
```
gulp app:build --app
```
### 四、使用细节
#### 1、合图
```
gulp sprites -s 文件夹名1,文件夹名2,文件夹名3,文件夹名4 --app
```
同时合图支持自定义`layout`，在命令行添加参数`-L`，空格后面跟上要合成的方式，如：
```
gulp sprites -s 文件夹名 -L top-down --app
```
可选参数见下表（[来源gulp.spritesmith官网](https://www.npmjs.com/package/gulp.spritesmith#algorithms)）

|         `top-down`        |          `left-right`         |         `diagonal`        |           `alt-diagonal`          |          `binary-tree`          |
|---------------------------|-------------------------------|---------------------------|-----------------------------------|---------------------------------|
| ![top-down][top-down-img] | ![left-right][left-right-img] | ![diagonal][diagonal-img] | ![alt-diagonal][alt-diagonal-img] | ![binary-tree][binary-tree-img] |

[top-down-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/top-down.png
[left-right-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/left-right.png
[diagonal-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/diagonal.png
[alt-diagonal-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/alt-diagonal.png
[binary-tree-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/binary-tree.png
#### 2、清理
```
gulp clean --app
```
#### 3、html模板引擎`pug`(原jade)
```
gulp pug --app
```
#### 4、css样式编译
```
<!-- 开发模式 -->
gulp sass --app

<!-- 生产模式 -->
gulp sass:build --app
```
#### 5、javascript压缩
```
gulp scripts --app
```
#### 6、图片压缩
```
gulp imagemin --app
```
### 五、技术详解
#### 1、gulp入口文件不处理任务逻辑
不要将所有任务的逻辑全部放到gulp入口文件中，那样的话，随着项目变得复杂，gulp入口文件将变得无法维护
```javascript
'use strict';
import requireDir from 'require-dir';

// 递归引入gulp/tasks目录下的文件
requireDir('./gulp/tasks', { recurse: true });
```
#### 2、拆分子任务
将子任务拆分到单独的文件中，这样可以提高子任务的复用度，如sass任务：
```javascript
import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
import cleancss from 'gulp-clean-css';

const handleErrors = require('../../lib/handleErrors');

import fs from 'fs';
const project = require('../../lib/project')();
let config;
if (fs.existsSync('./gulp/config' + project + '.js')) {
    config = require('../../config' + project).sass;
}

gulp.task('sass', () => {
    // 具体内容...
});

gulp.task('sass:build', () => {
    // 具体内容...
});
```
#### 3、项目的配置文件
将项目的配置文件抽离到'gulp/config.xxx.js'中，方便统一管理、配置。
```javascript
// config.app.js
const src = 'src/app';
const dest = 'build/app';
const sass = `${src}`;

module.exports = {
    browsersync: {
        development: {
            notify: false,
            port: 8000,
            server: {
                baseDir: [dest],
                index: 'index.html',
                routes: {
                    // '/bower_components': 'bower_components'
                }
            },
            browser: ["chrome"/*,"google chrome"*/],
            open: 'external' // local, external, ui, ui-external, tunnel or false
        }
    },
    delete: {
        src: [dest]
    },
    pug:{
		src:[`${src}/pug/**/*.pug`, `!${src}/pug/components/*`, `!${src}/pug/layout/*`],
		dest:dest,
		data:`${src}/pug/data/`
    },
    sass: {
        src: `${src}/sass/**/*.scss`,
        dest: `${dest}/css`,
        options:{
            outputStyle: 'expanded'//nested expanded compact compressed
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
        base64:{
            baseDir: `${dest}/css`,
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8 * 1024
        }
    },
    imagemin: {
        src: `${src}/images/**/*`,
        dest: `${dest}/images/`,
        srcico:`${src}/*.{ico,png}`,
        destico:`${dest}/`
    },
    uglify:{
    	src:`${src}/js/**/*.js`,
    	dest:`${dest}/js/`
    },
    watch: {
    	changes:[
	    	`${dest}/**/*.html`,
	    	`${dest}/images/**/*`,
	    	`${dest}/css/**/*.css`,
	    	`${dest}/js/**/*`
    	],
        sass: `${sass}/sass/**/*.scss`,
        pug:`${src}/pug/**/*.pug`,
        images:`${src}/images/**/*.{jpg,jpeg,png,gif}`,
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
```
```javascript
// 子任务文件，通过下列方式一如配置文件
let config = require('../../config.xxx');
```
#### 4、抽离工具函数，放到单独的目录
```javascript
import notify from "gulp-notify";

// 处理错误信息的工具函数
module.exports = function() {
  let args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};
```
#### 5、如何设计普通的子任务（以sass为例）
```javascript
import gulp from 'gulp';
const $ = require('gulp-load-plugins')();// 按需引入package.json中的依赖包（推荐方式，可以解决沉余文件引起的报错）
import cleancss from 'gulp-clean-css';// 上面方式无法引入的需单独引入
const handleErrors = require('../../lib/handleErrors');// 错误处理工具函数

import fs from 'fs';
const project = require('../../lib/project')();// 解析、处理命令行配置参数
let config;
// 判断配置文件是否存在，存在就引入
if (fs.existsSync('./gulp/config' + project + '.js')) {
    config = require('../../config' + project).sass;
}
// 开发模式
gulp.task('sass', () => {
    return gulp.src(config.src)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass(config.options).on('error', handleErrors))
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe($.sourcemaps.write('./.map'))
        .pipe(gulp.dest(config.dest));
});
// 生产模式
gulp.task('sass:build', () => {
  // 根据是否有base64配置项执行不同的任务
    if (!!config.base64) {
        return gulp.src(config.src)
            .pipe($.plumber())
            .pipe($.sass().on('error', handleErrors))
            .pipe($.autoprefixer(config.autoprefixer))
            .pipe(cleancss({
                compatibility: 'ie8'
            }))
            .pipe($.base64(config.base64))
            .pipe(gulp.dest(config.dest))
    } else {
        return gulp.src(config.src)
            .pipe($.plumber())
            .pipe($.sass().on('error', handleErrors))
            .pipe($.autoprefixer(config.autoprefixer))
            .pipe(cleancss({
                compatibility: 'ie8'
            }))
            .pipe(gulp.dest(config.dest))
    }
});
```
注：以上任务遵循就近原则，把相关的任务写在一起。这样任务一目了然，维护方便
#### 6、如何设计综合任务
```javascript
import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSequence from 'gulp-sequence';// 可以让任务按顺序

const project = require('../lib/project')();
const config = require('../config' + project).watch;
const reload = browserSync.reload;

/**
 * Start browsersync task and then watch files for changes
 */
// 开发模式
gulp.task('app', (callback) => {
  // 先依次执行`delete`、`imagemin`,然后并行执行`pug`、`sass`、`scripts`,再依次执行`browsersync`、`app:watch`
    gulpSequence(
        'delete',
        'imagemin', [
            'pug',
            'sass',
            'scripts'
        ],
        'browsersync',
        'app:watch'
    )(callback);
});
// 实时监听任务
gulp.task('app:watch', () => {
    gulp.watch(config.changes).on('change', reload).on('error', () => {});

    gulp.watch(config.images, ['imagemin'])
    gulp.watch(config.pug, ['pug'])
    gulp.watch(config.sass, ['sass'])
    gulp.watch(config.scripts, ['scripts'])
});
// 生产模式
gulp.task('app:build', gulpSequence(
    'delete',
    'imagemin', [
        'pug',
        'sass:build',
        'scripts'
    ]
));
```
