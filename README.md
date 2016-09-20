# gulp-T 多项目管理
Long, long ago... Gulp都是一堆依赖包只对应一个项目，很难一个gulp配置文件用在多个项目的情况。本项目就是为了解决这个痛点而整合出来的。其中融入了作者大量的心血，可谓扩展性高、配置文件复用率强、配置简单，而且还加入一些好用的task，比如合成多张精灵图，合图后rem单位的使用，图片按需转换成base64...

## 下载
```
git clone https://github.com/121595113/gulp-T.git
```
## 使用方法

### 一、安装依赖
```
npm install
```
### 二、开发模式
```
gulp app --app // 其中app为项目配置文件名config.app.js
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
