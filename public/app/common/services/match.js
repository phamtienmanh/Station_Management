var module = angular.module('common.services.match',[]);
module.factory('matchServices', [
    '$http',
    '$q',
    function ($http,
              $q) {
        var service = {};

        /**
         * Get matchs list by staId
         * @returns {*}
         */
        function getList(staId) {
            return $http.get('/matchs/matchs/'+staId);
        }

        /**
         * Get matchs list by staId, date
         * @returns {*}
         */
        function getListInDate(staId, selectedDate) {
            return $http.post('/matchs/matchsindate', {staId: staId, selectedDate: selectedDate, selectedDatePlus: moment(selectedDate).add(1, 'day')});
        }

        /**
         * Get matchs list by staId, month
         * @returns {*}
         */
        function getListInMonth(staId, selectedDate) {
            return $http.post('/matchs/matchsinmonth', {staId: staId, beginMonth: moment(selectedDate).startOf('month').add(7, 'hour'), endMonth: moment(selectedDate).endOf('month').add(7, 'hour')});
        }

        /**
         * Get match details by id
         * @param id
         * @returns {*}
         */
        function getDetails(id) {
            return $http.get('/matchs/details/'+id);
        }

        /**
         * Add new match
         * @param model
         * @returns {HttpPromise}
         */
        function addNew(mod) {
            var model = angular.copy(mod);
            model.beginTime = model.beginTime ? ((model.beginTime.slice(3,5)-0)==0 ? moment(model.selectedDate).startOf('day').add(model.beginTime.slice(0,2)-0+7, 'hour') : moment(model.selectedDate).startOf('day').add(model.beginTime.slice(0,2)-0+7.5, 'hour')) : moment(model.selectedDate).startOf('day').add(8, 'hour');
            model.endTime = model.endTime ? ((model.endTime.slice(3,5)-0)==0 ? moment(model.selectedDate).startOf('day').add(model.endTime.slice(0,2)-0+7, 'hour') : moment(model.selectedDate).startOf('day').add(model.endTime.slice(0,2)-0+7.5, 'hour')) : moment(model.selectedDate).startOf('day').add(8, 'hour');
            return $http.post('/matchs/create', model);
        }

        /**
         * Update match
         * @param id, model
         * @returns {HttpPromise}
         */
        function update(id, mod) {
            var model = angular.copy(mod);
            model.beginTime = model.beginTime ? ((model.beginTime.slice(3,5)-0)==0 ? moment(model.selectedDate).startOf('day').add(model.beginTime.slice(0,2)-0+7, 'hour') : moment(model.selectedDate).startOf('day').add(model.beginTime.slice(0,2)-0+7.5, 'hour')) : moment(model.selectedDate).startOf('day').add(8, 'hour');
            model.endTime = model.endTime ? ((model.endTime.slice(3,5)-0)==0 ? moment(model.selectedDate).startOf('day').add(model.endTime.slice(0,2)-0+7, 'hour') : moment(model.selectedDate).startOf('day').add(model.endTime.slice(0,2)-0+7.5, 'hour')) : moment(model.selectedDate).startOf('day').add(8, 'hour');
            return $http.post('/matchs/update/'+id, model);
        }

        /**
         * Delete match by id
         * @param taskId
         * @returns {*}
         */
        function del(id) {
            return $http.post('/matchs/delete/'+id)
        }

        service.getList = getList;
        service.getListInDate = getListInDate;
        service.getListInMonth = getListInMonth;
        service.getDetails = getDetails;
        service.addNew = addNew;
        service.update = update;
        service.del = del;
        return service;
    }]);
