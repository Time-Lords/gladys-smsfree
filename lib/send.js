var config = require('./config.js');

module.exports = function (user, pass, message){
	message = encodeURI(message);
	var url = `${config.endpoint}?user=${user}&pass=${pass}&msg=${message}`;
	return gladys.utils.request({url: url});
};