// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
app.controller('ModalCtrl', ['$scope','$rootScope','$log','NoteService',function ($scope,$rootScope,$log,NoteService) {
    $scope.showModal = false;
    $scope.open = function(){
    $scope.showModal = !$scope.showModal;
    };
    $scope.ok = function(){
      $scope.showModal = !$scope.showModal;
    };

    $scope.addNote = function(note){
      if(isValid(note)){
        if(!Array.isArray(note.labelList)){
           note.labelList = note.labelList.split(' ');
        }
        NoteService.addNote(note).then(function(response){
          $rootScope.$broadcast('updateList');
        });
      }
    };

    function isValid(obj){
       return obj && obj !== 'null' && obj !== 'undefined';
    };
  }]);
