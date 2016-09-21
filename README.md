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
可选参数见表（[来源gulp.spritesmith官网](https://www.npmjs.com/package/gulp.spritesmith#algorithms)）

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
