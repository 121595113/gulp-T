# gulp-T 多项目管理
Long, long ago... Gulp都是一堆依赖包只针对一个项目，很（kao）难（bei）一个gulp配置文件用在多个项目。本项目就是为了解决这个痛点而整合出来的。其中融入了作者大量的心血（Holidays），可谓扩展性高、配置文件复用强、配置简单的gulp使用案例。默认已配置了一些好用的task。其中最好用的莫过于精灵合图了，支持同时合成多张图片；轻松完成`hover`、`active`状态的使用；移动端支持以rem方式的引用，`background-position`采用百分比的方式，定位更加精准。其它有，样式中图片引用按需转成base64，pug编译实现结构与数据分离...

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
gulp app --app // 其中‘-app’为项目读取配置文件所需参数名，配置文件路径'gulp/config.app.js'
```
### 三、生产模式
```
gulp app:build --app
```
### 四、使用细节
#### 1、合图(支持@2x合成两倍图片)
```
gulp sprites -s 文件夹名1,文件夹名2,文件夹名3,文件夹名4 --app
```
同时合图支持自定义`layout`，在命令行添加参数`-L`，空格后跟上要合成的方式，如：
```
gulp sprites -s 文件夹名 -L top-down --app
```
可选参数见下表（[来源gulp.spritesmith官网](https://www.npmjs.com/package/gulp.spritesmith#algorithms)）,默认`binary-tree`

|         `top-down`        |          `left-right`         |         `diagonal`        |           `alt-diagonal`          |          `binary-tree`          |
|---------------------------|-------------------------------|---------------------------|-----------------------------------|---------------------------------|
| ![top-down][top-down-img] | ![left-right][left-right-img] | ![diagonal][diagonal-img] | ![alt-diagonal][alt-diagonal-img] | ![binary-tree][binary-tree-img] |

[top-down-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/top-down.png
[left-right-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/left-right.png
[diagonal-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/diagonal.png
[alt-diagonal-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/alt-diagonal.png
[binary-tree-img]: https://raw.githubusercontent.com/twolfson/layout/2.0.2/docs/binary-tree.png
关于合图后的图片引用参考[sass中如何使用合图？](#user-content-7样式中如何使用合图)
#### 2、清理
```
gulp clean --app
```
#### 3、html模板引擎`pug`(原jade)
```
gulp pug --app
```
**支持gbk编码请参考[gulp-gbk分支](https://github.com/121595113/gulp-T/tree/gulp-gbk)**
#### 4、css样式编译
```
<!-- 开发模式 -->
gulp sass --app

<!-- 生产模式 -->
gulp sass:build --app
```
#### 5、javascript压缩（支持es6语法）
```
gulp scripts --app
```
#### 6、图片压缩
```
gulp imagemin --app
```

#### 7、zip压缩(支持md5命名)
```
gulp zip --app
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
const project = 'app';
const src = `src/${project}`;
const dest = `build/${project}`;
const BS = process.platform == 'darwin' ? "google chrome" : "chrome";
module.exports = {
    browsersync: {
        development: {
            notify: false,
            port: 8000,
            server: {
                baseDir: [src, dest],
                index: 'index.html',
                routes: {
                    // '/bower_components': 'bower_components'
                }
            },
            // proxy: "http://172.16.13.22:812", //后端服务器地址
            // serveStatic: [src,dest], // 本地文件目录，proxy同server不能同时配置，需改用serveStatic代替
            browser: [BS],
            open: 'external' // local, external, ui, ui-external, tunnel or false
        }
    },
    delete: {
        src: [dest]
    },
    pug: {
        src: [`${src}/pug/**/*.pug`, `!${src}/pug/components/*`, `!${src}/pug/layout/*`],
        dest: dest,
        data: `${src}/pug/data/`,
        charset:'utf-8'
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
    ],
    'zip'
));
```

#### 7、sass中如何使用合图？
由于合图任务不是高频操作的任务，所以把它独立出来显得尤为重要。合图任务会在当前项目`'sass/sprites/'`文件夹下生成对应的配置文件，如果涉及到添加、删除、修改图片的情况，需要重新生成。合图的使用方法定义在`'_source/_function/'`中，使用的时候要像下面这样引用到scss样式中：
```scss
// 1、首先引入调用所需的@mixin
@import "../../../_source/_function/mobile-mixin";

// 2、然后引入合图生成的配置文件，这里以'cur'为例
@import "./sprites/cur";

// 3、使用
// 3.1单个图片的引用
div{
  @include sprite($cur-lv2);// 参数为$文件夹名-文件名
}

// 3.2.1一次性引入全部
@include sprites($cur-sprites);// 参数为$文件夹名-sprites

// 3.2.2你可以自定义输出样式前缀，参数为$pre-name
@include sprites($cur-sprites,$pre-name:'icon');

// 3.2.3你也可以自定义输出样式连字符，参数为$separator
@include sprites($cur-sprites,$separator:'__');

// 3.2.4高清屏@2x图片的使用，参数为$retina
@include sprites($cur-sprites,$retina:true);

// 3.2.5扩展css，添加一个而外的class并将图片的引用放在这个class上，参数为$expand
@include sprites($cur-sprites,$expand:true);
/*像这样
.cur_sprites {
  background-image: url(../images/cur-sprite.png?1484875398201);
  background-repeat: no-repeat;
}

.cur_lv2 {
  background-position: 0px 0px;
  width: 76px;
  height: 88px;
}

.cur_lv3 {
  background-position: -80px 0px;
  width: 76px;
  height: 88px;
}
*/
```
同时支持rem方式的调用，只要在方法前添加rem-前缀,内部调用了rem-calc()
```scss
div{
  @include rem-sprite($cur-lv2);// 参数为$文件夹名-文件名
}
@include rem-sprites($cur-sprites);

// rem计算基数可以自定义，默认是全局的$rem-base
div{
  @include rem-sprite($cur-lv2,$rem-base:720);// 带rem计算基数的,720是设计稿的尺寸
}
@include rem-sprites($cur-sprites,$rem-base:720);// 带rem计算基数的,720是设计稿的尺寸
```
#### 8、关于px转rem方式？
rem的转换时通过@function rem-calc()转换的,使用方式如下
```scss
div{
    width: rem-calc(100px);// px单位可以省略,建议一直省略
}

// 支持多个参数
div{
    margin: rem-calc(10 20 auto 40);
}

// 支持自定义计算基数，以320为分隔点，'< 320'根据字体大小计算，'>= 320'根据设计稿宽度计算
div{
    width: rem-calc(100px,720);// 这里是根据设计稿720计算的
    margin: rem-calc(10 20 auto 40,32);// 这里是根据字体大小32计算的
}
```
#### 9、关于移动适配的实现？
适配的实现有好多种。有通过js控制的（[手淘方案](https://github.com/amfe/lib-flexible)），有通过css控制的，这里采用后者。使用方式如下
```scss
$Response:true;// 在sass文件中将$Response设为true就开启了响应式
```
默认适配手机尺寸列表：`$mediaArrays:(320 360 375 400 480 540 640 720) !default;`,你也可以自定义适配的手机尺寸
```scss
$Response:true;
$mediaArrays:(320 375 480 640 720);// 自定义适配手机尺寸
```
