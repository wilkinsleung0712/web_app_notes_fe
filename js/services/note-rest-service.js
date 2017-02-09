app.service('NoteService',['$log','$http','$q',NoteService]);

function NoteService($log,$http,$q){
  var self = this;
  var baseReqUri = 'http://localhost:8080/';
  var baseResourceUri = 'http://localhost:8080/rest/note';
  self.allNotes = function(){
    var defered = $q.defer();
    $http.get(baseResourceUri + '/all').then(function(response){
      return defered.resolve(response.data);
    }),function(error){
      $log.debug(error);
      return deferred.reject(error);
    };
    return defered.promise;
  };

  self.getNote = function(noteId){
    // var deferred = $q.defer();
    //this should call a find method
    // you need two return from here to return the result to parent
    return $http.get(baseReqUri + noteId).then(function(response){
      return response.data;
    }),function(error){
      $log.debug(error);
      return response.error;
    };
  };

  // update function
  self.updateNote = function(note){
    var deferred = $q.defer();
    //put(url, data, [config]);
    var updateUri = baseResourceUri + '/'+note.id;
    $http.put(
          // {
          // uri:updateUri,
          // data:{'note':note},
          // headers: {
          //          'Content-Type': 'application/json'}
          // }
          updateUri,
          note
        ).then(function(response){
                return deferred.resolve(response.data);
            }, function(error){
              $log.debug(error);
              return deferred.reject(error);
            });


        return deferred.promise;
    }

  // deleteNote
  self.deleteNote = function(note){
    var deferred = $q.defer();
    $http.post(baseResourceUri + "/"+note.id).then(function(response){
      return deferred.resolve(response.data);
    },function(response){
      return response.error;
    });

    return deferred.promise;
  }

  // addNote
  self.addNote = function(note){
    var deferred = $q.defer();
    $http.post(baseResourceUri + '/create',note).then(function(response){
      return deferred.resolve(response.data);
    },function(response){
      return response.error;
    });

    return deferred.promise;
  }
}
