'use strict';

module.exports = {

	/**
	 * @method getTemplate
	 * @param req
	 * @param req
	 * @param next
	 */
	index: function(req, res, next){
		SmsfreeMessage.find({where: {user: req.session.User.id}, limit: 20, sort: 'id DESC'}, function(err, messages){
			if(err) return res.json(400, err);

			res.json(messages);
		});
	},

	/**
	 * @method send
	 * @param req
	 * @param req
	 * @param next
	 */
	send: function(req, res, next){
		SmsfreeConfig.findOne({user: req.session.User.id}, function(err, config){
			if(err) return res.json(err);
			if(!config){
				err = new Error('Config not found');
				return res.json(400, 'Config not found');
			}

			SmsfreeService.send(config.id, req.param('message'), function(err, message){
				if(err) return res.json(err);

				res.json(message);
			});
		});
	},


	/**
	 * @method getTemplate
	 * @param req
	 * @param req
	 * @param next
	 */
	getTemplate: function(req, res, next){
		SmsfreeTemplate.find({user: req.session.User.id}, function(err, templates){
			if(err) return res.json(400, err);

			return res.json(templates);
		});
	},

	/**
	 * @method addTemplate
	 * @param req
	 * @param req
	 * @param next
	 */
	addTemplate: function(req, res, next){
		SmsfreeConfig.findOne({user: req.session.User.id}, function(err, config){
			if(err)return res.json(400, err);
			if(!config){
				err = new Error('Config not found');
				return res.json(400, 'Config not found');
			}

			var templateObj = {
				user: req.session.User.id,
				message: req.param('message'),
				config: config.id,
				name: req.param('name')
			};

			SmsfreeTemplate.create(templateObj, function(err, template){
				if(err) return res.json(400, err);

				return res.json(template);
			});
		});
	},

	/**
	 * @method updateTemplate
	 * @param req
	 * @param req
	 * @param next
	 */
	updateTemplate: function(req, res, next){
		var templateObj = {
			message: req.param('message'),
			name: req.param('name')
		};

		SmsfreeTemplate.update({id: req.param('id'), user: req.session.User.id}, templateObj, function(err, template){
			if(err) return res.json(400, err);

			res.json(template[0]);
		});
	},

	/**
	 * @method destroyTemplate
	 * @param req
	 * @param req
	 * @param next
	 */
	destroyTemplate: function(req, res, next){
		SmsfreeTemplate.destroy({id: req.param('id'), user: req.session.User.id}, function(err, template){
			if(err) return res.json(400, err);

			res.json(template[0]);
		});
	},



	/**
	 * @method getConfig
	 * @param req
	 * @param req
	 * @param next
	 */
	getConfig : function(req, res, next){
		SmsfreeConfig.findOne({user: req.session.User.id}, function(err, config){
			if(err)return res.json(400, err);

			res.json(config);
		});
	},

	/**
	 * @method addConfig
	 * @param req
	 * @param req
	 * @param next
	 */
	addConfig: function(req, res, next){
		var configObj = {
			user: req.session.User.id,
			apiUser: req.param('apiUser'),
			apiPass: req.param('apiPass'),
		};

		SmsfreeConfig.create(configObj, function(err, config){
			if(err) return res.json(400, err);

			res.json(config);
		});
	},

	/**
	 * @method updateConfig
	 * @param req
	 * @param req
	 * @param next
	 */
	updateConfig: function(req, res, next){
		var configObj = {
			apiUser: req.param('apiUser'),
			apiPass: req.param('apiPass')
		};

		SmsfreeConfig.update({id: req.param('id'), user: req.session.User.id}, configObj, function(err, config){
			if(err) return res.json(400, err);

			res.json(config[0]);
		});
	}

};