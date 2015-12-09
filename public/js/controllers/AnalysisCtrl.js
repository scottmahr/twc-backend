var app = angular.module("twc");

app.controller('AnalysisCtrl', ['$scope','$mdDialog','$timeout','FormState','FormEditState','FormGlobals','FormLifts','FormAnalysis', 
      function($scope,$mdDialog,$timeout,FormState,FormEditState,FormGlobals,FormLifts,FormAnalysis){
    $scope.s = FormState;
    
    $scope.m ={
        
    }

    //We should load lifts
    console.log('we are loading lifts')
    FormLifts.getLifts();
    

    $scope.liftChecked = function(liftID){
        FormEditState.setSelectedLiftByID(liftID);
        //uncheck all of the other boxes
        _.each(FormState.lifts,function(lift){
            if(lift._id==liftID){
                console.log('lift:',lift)
                $scope.$emit('loadLift', {lift:lift});
                return;
            }
            lift.checked = false;
        });
    }

    $scope.checkLift = function(lift){
        //console.log('eval')
        if(!lift.liftTraining||!lift.confirmedMetrics){
            return false;
        }
        var pass = true;
        var delta;
        _.each(lift.confirmedMetrics,function(val,key){
            if(!_.has(lift.metrics,key)){
                pass = false;
                //console.log('failed because no metrics')
            }else{
                delta = val - lift.metrics[key];
                //console.log('delta',delta)
                if(Math.abs(delta)>20){
                    pass=false;
                }
            }
        })
        return pass;
    }

    $scope.addData = function(){
        console.log('trying to plot data')
        //var raw = [[[1,21],[2,12],[3,24],[4,26],[5,2],[6,22],[7,21],[8,23],[9,25]]]

        //$scope.$broadcast('linePlot',
        //    {raw:raw,yaxes:[0,1,1], plotIdx:1}   //,ranges:[[0,30],[-.25,1.75],[-3,3]]}
        //);

        $scope.loadData()

    }
    
    $scope.$on('newLiftSelected', function (event, data) {
        $scope.loadData(data.lift)
    });

    $scope.testAll = function(){
        _.each(FormState.lifts,function(lift,idx){
            $timeout(function(){
                FormEditState.setSelectedLiftByID(lift._id);
            },2000*idx);
        })
    }


    $scope.setAsGood = function(){
        var lift = FormState.lift();
        //now we find the right indexes and save them

        var confirmed = ['thrusterEndMinIdx','thursterPushIdx','deadliftPullIdx','hipDriveIdx','catchIdx','startIdx','squatBottomIdx','squatStartMinIdx','squatEndMinIdx']
        var confirmedMetrics = {};
        _.each(confirmed,function(metric){
            //check if we have any metrics to save
            if(_.has(lift.metrics,metric)){
                confirmedMetrics[metric] = lift.metrics[metric];
            }
        });

        FormLifts.updateLift({liftTraining:true,confirmedMetrics:confirmedMetrics},lift);

    }

    $scope.setAsBad = function(){
        var lift = FormState.lift();
        FormLifts.updateLift({liftTraining:true},lift);
    }

    $scope.setAsOmit = function(){
        var lift = FormState.lift();
        FormLifts.updateLift({liftTraining:false},lift);
    }

    $scope.loadData = function(lift){
        if(!lift){
            lift = FormState.lift();
        }

        var liftData = FormAnalysis.analyzeLift(lift);

        //console.log('data - boom')
        if(!_.has(liftData,'filtAccel')){
            return;
        }

        lift = FormAnalysis.doAnalysis(lift,liftData);
        var offset = FormGlobals.myAverage(_.pluck(lift.altitude,1)).mean - 
                     FormGlobals.myAverage(_.pluck(lift.vision,2)).mean;
        




        var raw = [lift.acceleration,lift.altitude];

        $scope.$broadcast('linePlot',
                {raw:raw,yaxes:[0,1,1], plotIdx:1}   //,ranges:[[0,30],[-.25,1.75],[-3,3]]}
            );
        

        raw = [
            _.zip(_.range(liftData.filtElev.length),liftData.filtElev),
            _.zip(_.range(liftData.filtvel.length),liftData.filtvel),
            
            ];

        $scope.$broadcast('linePlot',
            {raw:raw,yaxes:[3,2,2,3], plotIdx:2,circles:circles}     //,ranges:[[0,30],[-.25,1.75],[-3,3]]}
        );



        var raw2 = [
            _.zip(_.range(liftData.filtAccel.length),liftData.filtAccel),
            _.zip(_.range(liftData.filtElev.length),liftData.filtElev),
            _.zip(_.range(liftData.filtvel.length),liftData.filtvel),
            _.zip(_.range(liftData.filtASlope.length),liftData.filtASlope),
            ];

        var m = lift.metrics;
         var circles = [    //idx,x,y
                ['#00ff00',2,m['maxVelIdx'],m['maxVel']],
                ['#ff0000',0,m['hipDriveIdx'],m['hipDrive']],
                ['#0000ff',0,m['floatIdx'],m['float']],
                ['#0000ff',0,m['catchIdx'],m['catch']],
                ['#00ff00',0,m['transitionIdx'],m['transition']],
                ['#00ff00',0,m['firstPullIdx'],m['firstPull']],
                ['#00ff00',0,m['startIdx'],0],

                ['#00ff00',1,m['squatBottomIdx'],m['squatBottom']],
                ['#00ff00',2,m['minVelIdx'],m['minVel']],
                ['#00ff00',2,m['maxVelIdx'],m['maxVel']],
                ['#00ff00',0,m['squatBottomForceIdx'],m['squatBottomForce']],
                ['#ff0000',0,m['squatStartMinIdx'],m['squatStartMin']],
                ['#0000ff',0,m['squatEndMinIdx'],m['squatEndMin']],

                ['#00ff00',0,m['jumpForceIdx'],m['jumpForce']],
                ['#00ff00',0,m['landingForceIdx'],m['landingForce']],
                ['#00ff00',1,parseInt((m['landingForceIdx']-m['jumpForceIdx'])/2+m['jumpForceIdx']),m['maxElev']],


                ['#00ff00',2,m['squatVelStartIdx'],0],
                ['#00ff00',2,m['squatVelEndIdx'],0],

                //deadlift
                ['#00ff00',0,m['deadliftPullIdx'],m['deadliftPull']],
                ['#00ff00',0,m['deadliftFinishIdx'],0],
                ['#00ff00',0,m['startIdx'],0],

                //jerk
                ['#00ff00',2,m['jerkMaxVelIdx'],m['jerkMaxVel']],
                ['#00ff00',0,m['jerkFirstPushIdx'],m['jerkFirstPush']],
                ['#00ff00',0,m['jerkSecondPushIdx'],m['jerkSecondPush']],
                ['#00ff00',1,m['firstPushHeightIdx'],m['firstPushHeight']],

                //thurster
                ['#00ff00',0,m['thrusterEndMinIdx'],m['thrusterEndMin']],
                ['#00ff00',0,m['thursterPushIdx'],m['thursterPush']],
         ];

        $scope.$broadcast('linePlot',
            {raw:raw2, plotIdx:3,circles:circles}     //,ranges:[[0,30],[-.25,1.75],[-3,3]]}
        );


    }



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