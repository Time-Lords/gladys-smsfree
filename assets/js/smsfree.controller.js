(function () {
  'use strict';

  angular
    .module('app')
    .controller('smsfreeController', smsfreeController);

  smsfreeController.$inject = ['$timeout', 'smsfreeService'];

  function smsfreeController($timeout, smsfreeService){
		/* jshint validthis: true */
		var vm = this;

		/* Method */
		vm.addMessage = addMessage;
		vm.addTemplate = addTemplate;
		vm.updateTemplate = updateTemplate;
		vm.addConfig = addConfig;
		vm.updateConfig = updateConfig;
		vm.setModal = setModal;
		vm.destroyTemplate = destroyTemplate;

		/* Infos */
		vm.messages = [];
		vm.templates = [];
		vm.config = {};
		vm.error = {};

		/* Template config */
		vm.modal = false;
		vm.view = 'message';

		/* Form */
		vm.form = {};
		vm.form.addTemplate = {};
		vm.form.updateTemplate = {};
		vm.form.addMessage = {};
		var updateTemplate = {};

		activate();

		function activate() {
			getMessages();
			getTemplates();
			getConfig();
			waitMessage();
		}

		function setError(key, err){
			vm.error[key] = err;
		}

		function setModal(name, data){
			if(!name)return vm.modal = false;

			if(name == 'updateTemplate')
				copyTemplate(data);

			vm.modal = '/smsfree.modal.'+ name +'.html';
		}

		function addMessage(){
			setError('addMessage', false);

			return smsfreeService.addMessage(vm.form.addMessage)
				.then(function(){
					vm.form.addMessage = {};
				})
				.catch(setError.bind(null, 'addMessage'));
		}

		function getMessages(){
			return smsfreeService.getMessages()
				.then(function(messages){
					vm.messages = messages;
				});
		}

		function waitMessage(){
			smsfreeService.waitMessage(function(message){
				$timeout(function(){
					vm.messages.push(message);
				});
			});
		}

		function getTemplates(){
			return smsfreeService.getTemplates()
				.then(function(templates){
					vm.templates = templates;
				});
		}

		function getConfig(){
			return smsfreeService.getConfig()
				.then(function(config){
					vm.config = config;
				});
		}

		function addConfig(){
			return smsfreeService.addConfig(vm.config)
				.then(function(config){
					vm.config = config;
				});
		}

		function updateConfig(){
			return smsfreeService.updateConfig(vm.config)
				.then(function(config){
					vm.config = config;
				});
		}

		function addTemplate(){
			setError('addTemplate', false);

			return smsfreeService.addTemplate(vm.form.addTemplate)
				.then(function(template){
					vm.form.addTemplate = {};
					vm.templates.push(template);
					vm.setModal(false);
				})
				.catch(setError.bind(null, 'addTemplate'));
		}

		function updateTemplate(){
			setError('updateTemplate', false);

			return smsfreeService.updateTemplate(vm.form.updateTemplate)
				.then(function(template){
					vm.templates.splice(vm.templates.indexOf(updateTemplate), 1, template);
					vm.setModal(false);
				})
				.catch(setError.bind(null, 'updateTemplate'));
		}

		function destroyTemplate(template){
			setError('destroyTemplate', false);

			return smsfreeService.destroyTemplate(template)
				.then(function(){
					vm.templates.splice(vm.templates.indexOf(updateTemplate), 1);
				})
				.catch(setError.bind(null, 'destroyTemplate'));
		}

		function copyTemplate(template){
			updateTemplate = template;
			vm.form.updateTemplate = angular.copy(template);
		}

  }
})();