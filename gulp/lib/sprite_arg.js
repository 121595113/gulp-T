module.exports = function() {
  let args = process.argv.slice(2);
  let dir_names = args[args.indexOf('-s') + 1];
  let layout = args.indexOf('-L') !== -1 ? args[args.indexOf('-L') + 1] : 'binary-tree';
  if (dir_names) {
    return {
      dir_names: dir_names.split(','),
      layout: layout
    };
  }
};
