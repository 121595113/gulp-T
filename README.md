# gulp-T 多项目管理

## 版本

当前版本V1.0.0，向下兼容。旧版传送[V0.6.0](https://github.com/121595113/gulp-T/tree/V0.6.0)

## 版本特性

- 零配置，也可以根据实际项目需要自定制配置
- 操作简单，对新手友好
- 扩展性更强
- 内置精灵合图功能
- 内置许多scss工具方法，比如px转rem的rem-calc()方法；响应式css的解决方案；通用reset配置

## 项目初心

Long, long ago... Gulp都是一堆依赖包只针对一个项目，很（kao）难（bei）一个gulp配置文件用在多个项目。本项目就是为了解决这个痛点而被创造出来的。其中融入了作者大量的心血（Holidays），也是进阶gulp使用不错的案例。内置了一些好用的task和两组组合task。其中，精灵合图功能过于强大，为此还单独抽离了一个库[gulp-sprites](https://github.com/121595113/gulp-sprites)...

## 下载

```bash
git clone https://github.com/121595113/gulp-T.git
```

## 使用方法

### 一、安装依赖包

```bash
cd gulp-T
npm install
```

### 二、创建项目

在`src/`目录下创建项目（已内置app、pc两个项目，可以直接修改使用）

### 三、运行项目

以app项目为例

#### 方式一，在gulp-T/根目录下跑指定项目

```bash
# 开发模式
gulp app --app

# 生产模式
gulp app:build --app
```

运行方式`gulp`+`任务名`(app)+`--项目名`(app)

#### 方式二，在指定项目内跑

首先在项目目录gulp-T/src/app/添加gulpfile.babel.js,添加以下代码

```javascript
'use strict';
import requireDir from 'require-dir';
// import gulp from 'gulp';

// Require all tasks in gulp/tasks, including subfolders
requireDir('../../gulp/tasks', { recurse: true });
```

然后，命令行

```bash
# cd gulp-T/src/app/

# 开发模式
gulp app

# 生产模式
gulp app:build
```

运行方式`gulp`+`任务名`(app)

## 内置任务

- 子任务
  - browsersync
  - compass[:build]
  - copy
  - delete
  - html
  - imagemin
  - pug
  - sass[:build]
  - script[:build]
  - sprites
  - zip
- 组合任务
  - app[:build]
  - pc[:build]

## Options

详细配置参见gulp-T/gulp/config.default.js

### browsersync

- notify
- port
- server
- middleware
- browser
- open

### compass

- development
- production

### copy

- key,名字随便取
  - src
  - dest

对象序列，如

```javascript
pic: {
  src: `${src}/pic/**/*`,
  dest: `${dest}/pic/`
}
```

### delete

- src

### html

- src
- dest

### imagemin

- key,名字随便取
  - src
  - dest

对象序列，如

```javascript
images: {
  src: `${src}/pic/**/*`,
  dest: `${dest}/pic/`
},
ico: {
  src: `${src}/*.{ico,png}`,
  dest: `${dest}/`
}
```

### pug

- src
- dest
- data

### sass

- src
- dest
- options
- autoprefixer
- base64

### uglify

- src
- dest

### sprites

- src
- dest

### zip

- src
- filename
- dest

### watch

- change
- sass
- pug
- html
- images
- scripts
- ...

## 如何自定义自己的组合任务

在单独项目里的gulpfile.babel.js内引入以下模块（使用者新制定的项目内需先创建上述js文件）

```javascript
import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSequence from 'gulp-sequence';

const config = require('../../gulp/config.default.js').watch;
const reload = browserSync.reload;
```

然后，开始组合自己的任务，添加如下代码

```javascript
// 开发组合任务
gulp.task('newTask', (callback) => {
  gulpSequence(
    'delete',
    'imagemin', [
      'html',
      'sass',
      'scripts'
    ],
    'browsersync',
    'newTask:watch'
  )(callback);
});

// 监听文件变化 & 浏览器同步
gulp.task('newTask:watch', () => {
  gulp.watch(config.changes).on('change', reload).on('error', () => {});

  gulp.watch(config.images, ['imagemin']);
  gulp.watch(config.html, ['html']);
  gulp.watch(config.sass, ['sass']);
  gulp.watch(config.scripts, ['scripts']);
});

// 生产组合任务
gulp.task('newTask:build', gulpSequence(
  'delete',
  'imagemin', [
    'html',
    'sass:build',
    'scripts:build'
  ],
  'zip'
));
```

此时就可以在项目目录下运行下面的命令了

```bash
# 开发模式
gulp newTask

# 生产模式
gulp newTask:build
```

### 如果想自定义通用的组合任务可以参考gulp-T/gulp/tasks/下app.js和pc.js创建自己的xx.js

## 如何修改默认的Options

在项目下创建config.gulp.js,添加如下通用代码

```javascript
import path from 'path';
const project = __dirname.split(path.sep).pop() || '';

const src = path.resolve(__dirname);
const dest = path.resolve(__dirname, `../../build/${project}`);

module.exports = {
  // 配置项写在这里
};
```

以browsersync为例，开发中，不同的项目对应不同的端口是很正常的需求；与后端联调中，接口代理也是刚需，修改代码如下

```javascript
// 因为代理依赖第三方模块，所以添加如下代码
const proxy = require('http-proxy-middleware');
// 设置代理
const middleware = [
  proxy('/接口名', {
    target: 'http://localhost:8080',
    changeOrigin: true
  }),
  proxy(['/接口1', '/接口2'], {
    target: 'http://localhost:8080',
    changeOrigin: true
  })
];

module.exports = {
  browsersync: {
    port: 8000,
    middleware: [...middleware],
    open: 'external' // local, external, ui, ui-external, tunnel or false
  },
};
```

再举一列，copy任务也是比较常见的需求，设置如下：

```javascript
module.exports = {
  // ...其他配置

  // 拷贝项目下pic文件拷贝到打包文件下pic
  copy: {
    pic: {
      src: `${src}/pic/**/*`,
      dest: `${dest}/pic/`
    }
  },
};
```

## 使用细节

### 1、精灵合图(支持@2x合成两倍图片)

```bash
gulp sprites -s 文件夹名1,文件夹名2,文件夹名3,文件夹名4 --app
```

同时合图支持自定义`layout`，在命令行添加参数`-L`，空格后跟上要合成的方式，如：

```bash
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

### 2、sass中如何使用合图？

由于合图任务不是高频操作的任务，所以不建议将sprites子任务在组合任务中出现。执行合图任务后会在当前项目`'sass/sprites/'`文件夹下生成对应的配置文件。配置文件使用方法如下：

```scss
// 1、首先引入调用所需的@mixin
@import "../../../_source/_function/mobile-mixin";

// 2、然后引入合图生成的配置文件，这里以'cur'为例
@import "./sprites/cur";

// 3.1单个图片的引用
div{
  @include sprite($cur-lv2); // 参数为$文件夹名-文件名
}

// 3.2一次性引入全部
@include sprites($cur-sprites); // 参数为$文件夹名-sprites
```

```scss
// 3.2.1你可以自定义输出样式前缀，参数为$pre-name
@include sprites($cur-sprites,$pre-name:'icon');

// 3.2.2你也可以自定义输出样式连字符，参数为$separator
@include sprites($cur-sprites,$separator:'__');

// 3.2.3高清屏@2x图片的使用，参数为$retina
@include sprites($cur-sprites,$retina:true);

// 3.2.4扩展css，添加一个而外的class并将图片的引用放在这个class上，参数为$expand
@include sprites($cur-sprites,$expand:true);
```

```scss
// 3.2.4生成结果
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
```

同时精灵合图支持rem方式的调用，只要在方法前添加rem-前缀,内部调用了rem-calc()方法

```scss
div{
  @include rem-sprite($cur-lv2); // 参数为$文件夹名-文件名
}
@include rem-sprites($cur-sprites);
```

rem计算基数可以自定义，默认是全局的$rem-base

```scss
div{
  @include rem-sprite($cur-lv2,$rem-base:720); // 带rem计算基数的,720是设计稿的尺寸
}
@include rem-sprites($cur-sprites,$rem-base:720); // 带rem计算基数的,720是设计稿的尺寸
```

### 3、关于px转rem方式？

rem的转换时通过@function rem-calc()转换的,如下:

```scss
div{
    width: rem-calc(100px);
    height: rem-calc(100); // px单位可以省略,建议一直省略
}

// 支持多个参数
div{
    margin: rem-calc(10 20 auto 40);
}
```

支持自定义计算基数，以320为分隔点，'< 320'根据字体大小计算，'>= 320'根据设计稿宽度计算

```scss
div{
    width: rem-calc(100px,720); // 这里是根据设计稿720计算的
    margin: rem-calc(10 20 auto 40,32); // 这里是根据字体大小32计算的
}
```

还可以设置全局rem计算基数和计算比值,如：

```scss
$rem-base: 750; // 可设置为设计稿宽度或字体大小(见下文)
$Response_rate: 100 / 750; // 可理解为：在750设计稿上， 100px = 1rem
```

默认值：

```scss
$rem-base: 16px !default; // 默认值16px，以字体大小设置
$Response_rate: 12 / 320 !default; // 可理解为：在320的设计稿上，12px = 1rem
```

### 4、关于移动适配的实现？

适配的实现有好多种。有通过js控制的（[手淘方案](https://github.com/amfe/lib-flexible)），有通过css控制的，这里采用后者。使用方式如下

```scss
$Response:true; // 设为true即为开启了响应式
```

默认适配手机尺寸列表：`320 360 375 400 480 540 640 720`,你也可以自定义适配的手机尺寸

```scss
$Response:true;
$mediaArrays:(320 375 480 640 720); // 自定义适配手机尺寸
```
