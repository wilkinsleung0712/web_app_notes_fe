app.controller('NoteCtrl', ['$scope','$log','$uibModal','NoteService',function($scope,$log,$uibModal,NoteService) {
    //init notes list
    $scope.allNotes = getAllNote();
    // func to join in json data
    var arrayToString = function(labelString){
        if(labelString){
          return labelString.join(", ");
        }
    };
    // func to retreive all notes
    function getAllNote(){
      NoteService.allNotes().then(function(response){
        var notes = response.data;
        notes.forEach(function(note){
          note.labelList = arrayToString(note.labelList);
        });
        $scope.allNotes = notes;
      });
    };

    $scope.$on('updateList',function(){
      // refresh data after changes
      $scope.allNotes = getAllNote();
    });

    $scope.deleteNote = function(note){
       var isnum = /^\d+$/.test(note.id);
       if(isnum && note ){
         NoteService.deleteNote(note).then(function(response){
           $log.info("->update");
           getAllNote();
         },function(response){
           alert(response.error);
         });
       }
    };
  }]);
