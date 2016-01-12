
module.exports.routes = {
  'post /sms' : 'SmsfreeController.send',
  'get /sms' : 'SmsfreeController.index',
	'get /sms/template' : 'SmsfreeController.getTemplate',
  '/sms/template/index' : 'SmsfreeController.getTemplate',
  'post /sms/template' : 'SmsfreeController.addTemplate',
  'put /sms/template' : 'SmsfreeController.updateTemplate',
  'delete /sms/template' : 'SmsfreeController.destroyTemplate',
  'get /sms/config' : 'SmsfreeController.getConfig',
  'post /sms/config' : 'SmsfreeController.addConfig',
  'put /sms/config' : 'SmsfreeController.updateConfig'
};