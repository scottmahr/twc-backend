var app = angular.module("twc");

app.controller('AdminCtrl', ['$scope','State', 
      function($scope,State){
    $scope.s = State;
 
   

}]);