//This is for all the configuration we need
var app = angular.module("twc");

//FormEditState is what we use to do most of the edits to form state. 
//Does things like changing weights, lift types, lifters. 
app.factory('EditState', ['$rootScope','Globals','State',
                function($rootScope, Globals,State) {


    var service = {};

    service.updateNearGyms = function(){
        return;
    }
    

    return service;


    
}]);

