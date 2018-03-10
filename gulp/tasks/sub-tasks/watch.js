import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';
import watch from 'gulp-watch';

const config = require('../../config.default.js').watch;

gulp.task('watch', () => {
  let { tasks, _tasks } = config;
  for (const task of tasks) {
    if (!_tasks[task]) continue;
    if(task !== 'imagemin'){
      gulp.watch(_tasks[task], [task]);
      continue;
    }
    watch(_tasks[task], () => {
      gulpSequence(task)();
    });
  }
});
