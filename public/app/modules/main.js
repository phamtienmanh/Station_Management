var app = angular.module('app.main', []);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('Application', {
        page_title: 'Application',
        url: "/Application",
        templateUrl: "app/modules/main/templates/main.html",
        controller: 'mainCtrl'
    });
    $stateProvider.state('Create', {
        page_title: 'Add New Station',
        url: "/Create",
        templateUrl: "app/modules/sta/templates/add.html",
        controller: 'staCtrl'
    });
    $urlRouterProvider.otherwise("/Application");
}]);