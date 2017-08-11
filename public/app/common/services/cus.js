var module = angular.module('common.services.cus',[]);
module.factory('cusServices', [
    '$http',
    '$q',
    function ($http,
              $q) {
        var service = {};

        /**
         * Get cuss list
         * @returns {*}
         */
        function getList() {
            return $http.get('/cuss/cuss');
        }

        /**
         * Get cus details by id
         * @param id
         * @returns {*}
         */
        function getDetails(id) {
            return $http.get('/cuss/details/'+id);
        }

        /**
         * Find Cus by name, phone
         * @param name, phone
         * @returns {*}
         */
        function findCus(cus) {
            return $http.post('/cuss/findcus', cus);
        }

        /**
         * Add new cus
         * @param model
         * @returns {HttpPromise}
         */
        function addNew(model) {
            return $http.post('/cuss/create', model);
        }

        /**
         * Update cus
         * @param id, model
         * @returns {HttpPromise}
         */
        function update(id, model) {
            return $http.post('/cuss/update/'+id, model);
        }

        /**
         * Delete cus by id
         * @param taskId
         * @returns {*}
         */
        function del(id) {
            return $http.post('/cuss/delete/'+id)
        }

        service.getList = getList;
        service.getDetails = getDetails;
        service.findCus = findCus;
        service.addNew = addNew;
        service.update = update;
        service.del = del;
        return service;
    }]);
