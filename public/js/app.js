var app = angular.module("twc", ['ngMaterial','ui.router','restangular']);

app.config(function($stateProvider, $urlRouterProvider,RestangularProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/editor");
  //
  // Now set up the states
  $stateProvider
    .state('admin', {
        url: "/admin",
        templateUrl: "html/admin.html",
        controller: 'AdminCtrl'
    })
    .state('editor', {
        url: "/editor",
        templateUrl: "html/editor.html",
        controller: 'EditorCtrl'
    })
    

    RestangularProvider.setBaseUrl('http://travelwodclub.herokuapp.com/api');
    //RestangularProvider.setBaseUrl('http://localhost:5000/api');
    

    RestangularProvider.setRestangularFields({
      id: "_id"
    });
    
});


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('cyan');
  });


app.run(function($rootScope, $interval,Boxes) {
  console.log('app has started up')

  var heartBeat;
  var startHeartbeat = function() {
      if(!!heartBeat){console.log('found heartbeat');return;}
      heartBeat = $interval(function() {
                $rootScope.$broadcast('heartbeat',{});
      }, 200);
  }

  var stopHeartbeat = function() {
      if (!!heartBeat){
          $interval.cancel(heartBeat);
          heartBeat = undefined;
      }
  };

  startHeartbeat();

});