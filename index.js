
var SmsFreeInstall = require('./lib/smsfreeInstall');

module.exports = function (sails) {

  gladys.on('sailsReady', function(){

    SmsFreeInstall.actionType(sails.config.smsfree.actionTypes, function(err){
      if(err)return sails.log.error('Smsfree : Install actionType failed :', err);
      sails.log.info('Smsfree : Install actionType OK');
    });

  });  

   
  var loader = require("sails-util-mvcsloader")(sails);
  loader.injectAll({
    policies: __dirname + '/policies',// Path to your hook's policies
    config: __dirname + '/config'// Path to your hook's config
  });

    
  return {
    defaults: require('./lib/defaults'),
    configure: require('./lib/configure')(sails),
    initialize: require('./lib/initialize')(sails),
    routes: require('./lib/routes')(sails),
  };


};