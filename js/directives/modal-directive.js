
app.directive('modal', function () {
    return {
      template: '<!--modal-->'+
      '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
          '<div class="modal-dialog">'+
              '<div class="modal-content">'+
                  '<div class="modal-header">'+
                      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">'+
                          '&times;'+
                      '</button>'+
                      '<h4 class="modal-title" id="myModalLabel">'+
                         'New Note Information'+
                      '</h4>'+
                  '</div>'+
                  '<div class="modal-body">'+
                     '<label>Title:</label><br/><input type="text" name="" class="col-sm-12" ng-model="note.title" /><br/>'+
                     '<label>Content:</label><br/><textarea  rows="10" class="form-control addtextarea"  ng-model="note.content"></textarea><br/>'+
                     '<label>Labels:</label><br/><input type="text" name="" class="col-sm-12" ng-model="note.labelList" /><br/>'+
                  '</div>'+
                  '<div class="modal-footer">'+
                      '<button type="button" class="btn btn-default" data-dismiss="modal">Close'+
                      '</button>'+
                      '<button type="button" class="btn btn-primary" data-dismiss="modal" ng-click="addNote(note)">'+
                          'Submit'+
                      '</button>'+
                  '</div>'+
              '</div><!-- /.modal-content -->'+
          '</div><!-- /.modal -->',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      controller:['$scope','$log','NoteService',ModalDataCtrl],
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        //show and hide by using $watch
        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });

  function ModalDataCtrl ($scope,$log,NoteService){
  };
