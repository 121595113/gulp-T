'use strict';
import fs from 'fs';
import path from 'path';
import requireDir from 'require-dir';

let taskPath = '';
for (const item of module.paths) {
    if (fs.existsSync(item)) {
        taskPath = path.resolve(item, '../gulp/tasks');
        break;
    }
}

// Require all tasks in gulp/tasks, including subfolders
requireDir(taskPath, { recurse: true });