'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.notes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html',
    controller: 'NotesController'
  });
}])
.controller('NoteController', function() {

});
