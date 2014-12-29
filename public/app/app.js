/**
 * Project Seed Module
 *
 * Description
 */
angular.module('ProjectSeed', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'app/home/home.html'
            });
        $locationProvider.html5Mode(true);
    });
