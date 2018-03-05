module.exports = function() {
  let _arg = '';
  process.argv.slice(2).forEach(function(item, index) {
    let arg = (arg = item.match(/^-{2}(.*)$/)) && arg[1];
    _arg = arg || _arg;
  });
  return _arg;
};
