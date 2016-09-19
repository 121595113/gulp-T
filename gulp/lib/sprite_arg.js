module.exports = function() {
    let args = process.argv.slice(2);
    let parg = args[args.indexOf('-s') + 1];
    if (parg) {
        return parg.split(',');
    }
}
