var module = angular.module('common.services.sta',[]);
module.factory('staServices', [
  '$http',
  '$q',
  function ($http,
            $q) {
    var service = {};

    /**
     * Get stas list
     * @returns {*}
     */
    function getList() {
      return $http.get('/stas/stas');
    }

    /**
     * Get sta details by id
     * @param id
     * @returns {*}
     */
    function getDetails(id) {
      return $http.get('/stas/details/'+id);
    }
    
    /**
     * Add new sta
     * @param model
     * @returns {HttpPromise}
     */
    function addNew(model) {
      return $http.post('/stas/create', model);
    }

    /**
     * Update sta
     * @param id, model
     * @returns {HttpPromise}
     */
    function update(id, model) {
      return $http.post('/stas/update/'+id, model);
    }

    /**
     * Delete sta by id
     * @param taskId
     * @returns {*}
     */
    function del(id) {
      return $http.post('/stas/delete/'+id)
    }

    service.getList = getList;
    service.getDetails = getDetails;
    service.addNew = addNew;
    service.update = update;
    service.del = del;
    return service;
  }]);
