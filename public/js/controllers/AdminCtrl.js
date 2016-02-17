var app = angular.module("twc");

app.controller('AdminCtrl', ['$scope','State','DropIns', 
      function($scope,State,DropIns){
    $scope.s = State;
 
    $scope.deleteDropIn = function(dropIn){
        console.log('deleting... '+dropIn._id)

        DropIns.deleteDropIn(dropIn);
    }
   

}]);