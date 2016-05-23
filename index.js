module.exports = function(sails) {
  return {
    install: require('./lib/install.js'),
    notify: require('./lib/notify.js')
  };
};