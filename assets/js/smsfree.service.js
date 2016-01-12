(function () {
  'use strict';
  angular
    .module('app')
    .factory('smsfreeService', smsfreeService);

    smsfreeService.$inject = ['$http','$q'];

    function smsfreeService($http, $q) {

      return {
        waitMessage: waitMessage,
        getMessages : request.bind(null, 'GET', ''),
        addMessage: request.bind(null, 'POST', ''),
        getConfig: request.bind(null, 'GET', '/config'),
        addConfig: request.bind(null, 'POST', '/config'),
        updateConfig: request.bind(null, 'PUT', '/config'),
        getTemplates: request.bind(null, 'GET', '/template'),
        addTemplate: request.bind(null, 'POST', '/template'),
        updateTemplate: request.bind(null, 'PUT', '/template'),
        destroyTemplate: request.bind(null, 'DELETE', '/template')
      };

      function waitMessage(fn){
        io.socket.on('smsfree:message', fn);
      }

      function request(method, url, data){
        var deferred = $q.defer();

        $http({method: method, url: '/sms' + url, data: data})
          .success(function(data, status, headers, config) {
            deferred.resolve(data);
          })
          .error(function(data, status, headers, config){
            if(status === 400){
              deferred.reject(data);
            }
          });

        return deferred.promise;
      }
		}

})();