var module = angular.module('app.main');
module.controller('staCtrl', [
    'cusServices',
    'matchServices',
    'staServices',
    '$scope',
    '$uibModal',
    '$q',
    function (cusServices,
              matchServices,
              staServices,
              $scope,
              $uibModal,
              $q) {
        function addNew(model) {
            staServices.addNew(model).then(function (resp) {
                alert('Add new station success');
            }, function (resp) {
                alert('Add new station fail');
            });
        }

        $scope.addNew = addNew;
    }
]);
