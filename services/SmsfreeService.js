'use strict';

var request = require('request');

function sendSms(user, pass, message, callback){
	message = encodeURI(message);
	var url = sails.config.smsfree.url +'?user=' + user + '&pass=' + pass + '&msg=' + message;
	request.get(url, callback);
}

module.exports = {

	/**
	 * @method send
	 * @param configId
	 * @param message
	 * @param callback
	 */
	send: function(configId, message, callback){
		callback = callback || function(){};

		SmsfreeConfig.findOne({id: configId})
			.exec(function(err, config){
				if(err)return callback(err);

				sendSms(config.apiUser, config.apiPass, message, function(err, res, body){
					if(err)return callback(err);

					var messageObj = {
						message: message,
						statusCode: res.statusCode,
						config: config.id,
						user: config.user
					};

					SmsfreeMessage.create(messageObj, function(err, message){
						if(err)return callback(err);

						SocketService.sendDesktopMessageUser(config.user, 'smsfree:message', message, function(){});

						callback(null, message);
					});
				
				});
			});
	},

	/**
	 * @method sendTemplate
	 * @param templateId
	 * @param callback
	 */
	sendTemplate: function(templateId, callback){
		SmsfreeTemplate.findOne({id: templateId})
			.exec(function(err, template){
				if(err)return callback(err);

				SmsfreeService.send(template.config, template.message, callback);
			});
	}

};
