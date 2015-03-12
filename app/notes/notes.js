'use strict';

var notelyBasePath = 'https://elevennote-nov-2014.herokuapp.com/api/v1/';
var apiKey = '$2a$10$0nJlKJMRwXhYvftMeVbPu.lTUUJ6qd8xhbT2s4AhGThPLde01xcnK';


// Declare app level module which depends on views, and components
angular.module('myApp.notes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html',
    controller: 'NotesController'
  });
}])
.controller('NotesController', ['$http', '$scope', function($http, $scope) {
  $http.get(notelyBasePath + 'notes.json?api_key=' + apiKey)
  .success(function(notes_data) {
      $scope.notes = notes_data;
  });
}]);
