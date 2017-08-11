var app = angular.module('app',[
    'ui.router',
    'ui.bootstrap',
    'app.main',
    'common.services',
    'dndLists',
    'angular.filter',
    'ui.utils.masks'
]);
app.directive('dragable', function(){
    return {
        restrict: 'A',
        link : function(scope,elem,attr){
            $(elem).draggable();
        }
    }
});