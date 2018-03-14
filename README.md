# gulp-T 多项目管理

## 版本

当前版本V1.3.1，向下兼容。旧版传送[V0.6.0](https://github.com/121595113/gulp-T/tree/V0.6.0)

## 版本特性

- 默认零配置，也可以根据实际项目需要自定制配置
- 操作简单，对新手友好
- 扩展性更强
- 支持js模块化开发
- 内置精灵合图功能
- 内置可在本地开启小型静态资源服务器功能
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

在`src/`目录下创建项目（已内置app、pc和webpack-demo三个项目，可以直接修改使用）

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
  - `browsersync`

    启一个本地服务并打开指定浏览器（可用来预览项目）

  - `compass[:build]`

    使用compass编译scss

  - `copy`

    用于拷贝src下的文件到dest指定目录下

  - `delete`

    删除之前打包好的项目文件

  - `dev-server`

    启一个本地服务并打开指定浏览器，然后监听本地文件变化并同步刷新浏览器

  - `html`

    将src下的`.html`文件拷贝到dest指定的目录下

  - `imagemin`

    用于压缩图片

  - `pug`

    处理`.pug`相关的文件。pug原名jade，是html预处理文件

  - `sass[:build]`

    将scss编译成css

  - `scripts[:build]`

    编译、压缩`.js`文件，支持es6语法

  - `scripts2[:build]`

    采用webpack编译、压缩`.js`文件，支持es6语法，支持js的模块化开发。需要注意的是模块文件命名请用`_`下划线开头

  - `sprites`

    精灵合图，也叫雪碧图。将零散的图片合成到一张图片上，以减少资源请求数

  - `watch`

    监听文件变化，执行相应的任务（用于开发时不需要刷新浏览器的任务）

  - `zip`

    将打包后的文件压缩成`.zip`文件，方便文件的传输

- 组合任务
  - `app[:build]`

    执行一组任务，app分别执行了`delete`, `imagemin`, `pug`, `sass`, `scripts`, `dev-server`；app:build分别执行了`delete`, `imagemin`, `pug`, `sass:build`, `scripts:build`

  - `pc[:build]`

    执行一组任务，pc分别执行了`delete`, `imagemin`, `html`, `sass`, `scripts`, `dev-server`；pc:build分别执行了`delete`, `imagemin`, `html`, `sass:build`, `scripts:build`

  - `webpack[:build]`

    执行一组任务，webpack分别执行了`delete`, `imagemin`, `html`, `sass`, `scripts2`, `dev-server`；webpack:build分别执行了`delete`, `imagemin`, `html`, `sass:build`, `scripts2:build`

以上任务带[:build]表示开发和生产模式两种任务，如compass[:build]表示有compass和compass:build两种任务

## Options

详细配置参见gulp-T/gulp/config.default.js

### browsersync

> browsersync任务配置

- `notify` ：Boolean类型，表是否在浏览器中显示通知，默认false
- `port` ：String类型，监听端口
- `server`
  - `baseDir`：String[]类型, 静态资源根目录
  - `index`：String类型，浏览器默认打开文件名
  - `routes`：Object类型，默认{}
- `middleware`：proxy[]类型，设置代理
- `browser`：String[]类型，打开浏览器列表
- `open`：String类型，项目在浏览器打开方式。可选值local, external, ui, ui-external, tunnel or false

### compass

> comapss任务配置

- `development`
  - `src`：glob类型路径，scss源码在系统中的路径
  - `dest`：编译后文件系统路径
  - `options`
    - `import_path`
    - `sass`
    - `css`
    - `image`
    - `sourcemap`：Boolean类型，是否生成调试文件.map，默认true
  - `autoprefixer`
    - `browsers`：Array类型，为css满足条件的浏览器厂商前缀
    - `cascade`
- `production`
  - `src`：glob类型路径，scss源码在系统中的路径
  - `dest`：编译后文件系统路径
  - `options`
    - `import_path`
    - `sass`
    - `css`
    - `image`
  - `autoprefixer`
    - `browsers`
    - `cascade`

### copy

> copy任务配置

- `key`,名字随便取，主要便于识别，利于后期维护
  - `src`：glob类型路径，要拷贝文件在系统中的路径
  - `dest`：拷贝到的系统路径

对象序列，如

```javascript
pic: {
  src: `${src}/pic/**/*`,
  dest: `${dest}/pic/`
}
```

### delete

> delete任务配置

- `src`：glob[]类型路径，要删除的文件

### html

> html任务配置

- `src`源目录
- `dest`目标目录

### imagemin

> imagemin任务配置

- `key`,名字随便取
  - `src`
  - `dest`

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

> pug任务配置

- `src`源目录
- `dest`目标目录
- `data`数据目录

### sass

> sass任务配置

- `src`源目录
- `dest`目标目录
- `options`
  - `includePaths`String[]类型,配置可以省略路径的文件
  - `outputStyle`压缩方式，可选nested、 expanded、 compact、 compressed
- `autoprefixer`同compass
- `base64`：Boolean类型，是否将满足条件的图片转成base64。默认true

### uglify

> scripts任务配置

- `src`源目录
- `dest`目标目录

### webpack

> scripts2任务配置,内部采用webpack编译js

- `src`源目录
- `dest`目标目录
- `options` Object类型，webpack配置对象。可配置以下两个属性
  - `devtool` String类型
  - `module` Object类型，可配置以下属性
    - `rules` Object[]类型，各种leader对象组成的数组

### sprites

> sprites任务配置

- `src`源目录
- `dest`目标目录

### zip

> zip任务配置

- `src`源目录
- `filename`打压缩包后的名字
- `dest`目标目录

### watch

> 要监听文件列表和要监听的任务

- `change`：glob[],要监听文件数组列表
- `tasks`：String[],要监听的任务数组。默认值['sass', 'pug', 'html', 'imagemin', 'scripts']

## 如何自定义自己的组合任务

在单独项目里的gulpfile.babel.js内添加下面注释部分的代码，并恢复注释（使用者新制定的项目内需先创建上述js文件）

```javascript
'use strict';
import fs from 'fs';
import path from 'path';
import requireDir from 'require-dir';
// import gulp from 'gulp';
// import gulpSequence from 'gulp-sequence';

let taskPath = '';
for (const item of module.paths) {
    if (fs.existsSync(item)) {
        taskPath = path.resolve(item, '../gulp/tasks');
        break;
    }
}

requireDir(taskPath, { recurse: true });
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
    'dev-server'
  )(callback);
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

## 如何修改默认的配置（Options）

在项目下创建config.gulp.js,添加如下通用代码

```javascript
import path from 'path';

const rootOfGulp = process.argv.rootOfGulp;
const src = path.resolve(__dirname);
const projectName = path.relative(rootOfGulp, src).replace('src/','');
const dest = path.resolve(rootOfGulp, `./build/${projectName}`);
Object.assign(process.argv, {dest});

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
// 1、首先引入调用所需的内置@mixin
@import "mobile-mixin";

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

## 常见问答

### 1、问：如何启动一个本地服务

> 答：在子项目中执行`gulp browsersync`，或者在根项目中执行`gulp browsersync --<子项目名>`。

### 2、问：如何启动监听文件变化

> 答：在子项目中执行`gulp watch`，或者在项目中执行`gulp watch --<子项目名>`

### 3、问：如何启动一个本地服务并监听文件变化

> 答：在子项目中执行`gulp dev-server`，或者在项目中执行`gulp dev-server --<子项目名>`

### 4、问：为什么要支持js模块化开发，又是怎么支持的

> 答：为了模块（代码片段）复用；只要把监听任务数组中的scripts换成scripts2就可以了
