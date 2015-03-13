'use strict';

var notelyBasePath = 'https://elevennote-nov-2014.herokuapp.com/api/v1/';
var apiKey = '$2a$10$0nJlKJMRwXhYvftMeVbPu.lTUUJ6qd8xhbT2s4AhGThPLde01xcnK';

angular.module('myApp.notes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html',
    controller: 'NotesController'
  });
}])

.controller('NotesController', ['$scope', 'NotesBackend', function($scope, NotesBackend) {

  NotesBackend.fetchNotes();

  $scope.notes = function() {
    return NotesBackend.getNotes();
  };

  $scope.hasNotes = function() {
    return $scope.notes().length > 0;
  };

  $scope.saveNote = function() {
    var note = $scope.note;
    if (note.id){
      NotesBackend.updateNote(note);
    }
    else {
        NotesBackend.postNote($scope.note, function(newNote) {
          $scope.note = JSON.parse(JSON.stringfy(newNote));
      });
    }
  };

  $scope.loadNote = function(note) {
    $scope.note = JSON.parse(JSON.stringify(note));
  };

  $scope.clearNote = function() {
    $scope.note = {};
    $scope.$broadcast('noteCleared');
  };

  $scope.findNoteById = function(noteId) {
    var notes = $scope.notes();
    for (var i=0; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        return notes[i];
      }
    }
  };

  $scope.buttonText = function(note) {
      return (note && note.id) ? 'Update Note' : 'Create Note';
  };

}])

.service('NotesBackend', ['$http', function($http){
  var notes = [];
  var self = this;

  this.getNotes = function() {
    return notes;
  };

  this.fetchNotes = function() {
    $http.get(notelyBasePath + 'notes.json?api_key=' + apiKey)
    .success(function(notes_data) {
      notes = notes_data;
    });
  };

  this.postNote = function(noteData, callback) {
    $http.post(notelyBasePath + 'notes', {
      api_key: apiKey,
      note: noteData
    }).success(function(newNoteData) {
      notes.push(newNoteData);
      callback(newNoteData);
    });
  };

  this.updateNote = function(note) {
    $http.put(notelyBasePath +  'notes/' + note.id, {
      api_key: apiKey,
      note: note
    }).success(function(response) {
      self.fetchNotes();
    })
  };

}]);
