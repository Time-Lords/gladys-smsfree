var send = require('./send.js');

module.exports = function(notification){
	return gladys.paramUser.getValue('smsfree_user', notification.user)
		.then(function(user){
			return [user, gladys.paramUser.getValue('smsfree_pass', notification.user)];
		})
		.spread(function(user, pass){
			return send(user, pass, `${notification.title}: ${notification.text}`);
		});
};