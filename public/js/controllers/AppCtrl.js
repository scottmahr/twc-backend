var app = angular.module("twc");



app.controller('AppCtrl', ['$scope', '$mdSidenav','$state', 
    function($scope, $mdSidenav,$state){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.goto = function(path){
    $state.go(path);
  }
 
}]);