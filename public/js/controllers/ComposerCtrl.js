var app = angular.module("twc");

app.controller('ComposerCtrl', ['$scope','$stateParams','$mdDialog','FormState','FormGlobals','FormLifts', 
      function($scope,$stateParams,$mdDialog,FormState,FormGlobals,FormLifts){
    $scope.s = FormState;
    
    $scope.m ={
        encoder : new Whammy.Video(),
        record : false,
        sloMo : false,
        videoURL : 'media/test.MOV'//"http://video.webmfiles.org/big-buck-bunny_trailer.webm" 
    }

    console.log($stateParams)
    //if we get a parameter, we need to load that lift
    if($stateParams.liftID){
        FormLifts.getLiftByID($stateParams.liftID);
    }

    $scope.makeVideo = function(){
        $scope.m.record = false;
        var output = $scope.m.encoder.compile();
        $scope.m.videoURL =  (window.webkitURL || window.URL).createObjectURL(output);
        console.log($scope.m.videoURL)
    }

    $scope.pickLift = function(ev) {
        console.log(FormState.lifter)

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


function DialogController($scope,$timeout,$mdDialog,FormState,FormEditState,FormLifts ) {
    $scope.s = FormState;
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.setLifter = function(lifter){
        FormEditState.setLifter(lifter);
    }

    $scope.setLift = function(liftID){
        console.log('setting lift',liftID)
        FormEditState.setSelectedLiftByID(liftID);
        $mdDialog.hide();
    }

    $scope.pickLifter = function(lifterID) {
        
        _.each(_.where(FormState.lifts,{checked:true}),function(lift,idx){
            
            $timeout(function(){
                console.log('Moving...',lift)
                FormLifts.updateLift({lifterID:lifterID},lift);
            },1000*idx)
        });

        console.log('you picked lifter'+lifterID)
        $mdDialog.hide();
    };

    $scope.orderByLength = function(lifter){
        return -lifter.lifts.length;
    }
}