import path from 'path';

const rootOfGulp = process.argv.rootOfGulp;
const src = path.resolve(__dirname);
const projectName = path.relative(rootOfGulp, src).replace('src/','');
const dest = path.resolve(rootOfGulp, `./build/${projectName}`);
Object.assign(process.argv, { dest });

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
    port: 8000,
    middleware: [...middleware],
    open: 'external' // local, external, ui, ui-external, tunnel or false
  },
  watch: {
    tasks: ['html', 'imagemin', 'scripts2']
  }
};
