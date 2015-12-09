var app = angular.module("twc");

app.controller('EditorCtrl', ['$scope','$mdDialog','State', 
      function($scope,$mdDialog,State){
        $scope.s = State;
        $scope.m = {
           
        };
    
    $scope.boxChecked = function(boxID){

    }
 
    $scope.uploadPicture = function(ev,boxID) {
        State.boxID = boxID;

        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'html/pickLiftDlg.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: true
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
        
    };


}]);




function DialogController($scope,$timeout,$mdDialog,$http,State ) {
    $scope.s = State;
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };



    $scope.add = function(){
        console.log('boxid',State.boxID)
      var f = document.getElementById('file').files[0],
          r = new FileReader();
      r.onloadend = function(e){
            image = e.target.result;
            image = image.replace('data:image/png;base64,','');
            //$http.post('http://localhost:5000/api/boxes/'+State.boxID, image,{
            $http.post('http://travelwodclub.herokuapp.com/api/boxes/'+State.boxID, image,{
                headers:{'Content-Type':'image/png'
            }})
            .success(function(newBox, status, headers){
                console.log(newBox)
                var idx = _.findIndex(State.boxes, function(box) {
                    return box._id == newBox._id;
                });
                if(idx>=0){
                    State.boxes[idx]=newBox;
                }
            })
            .error(function(data, status, headers){
                console.log('error',data,status)
            })
      }
      //r.readAsBinaryString(f);
      r.readAsDataURL( f );
      $mdDialog.hide();
    }



}