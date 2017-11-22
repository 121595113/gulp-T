module.exports = function() {
  let args = '';
  process.argv.slice(2).forEach(function(item, index) {
    let arg = (arg = item.match(/^-{2}(.*)$/)) && arg[1];

    if (arg) {
      args = '.' + arg;
    }
  });
  return args;
};
