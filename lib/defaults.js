'use strict';

/**
 * Module Configuration
 */


var param = require('./parametres.js');

module.exports.smsfree = {
    
  // title for the Hook
  title: 'smsfree',
	// the name of the hook folder
  folderName: param.folderName,

  url: 'https://smsapi.free-mobile.fr/sendmsg',

  actionTypes : [
    {
      serviceName: 'SmsfreeService',
      functionName: 'sendTemplate',
      name: 'Send SMS',
      description: 'Send a SMS with Free Mobile',
      optionspath: '/sms/template/index'
    }
  ]

};
