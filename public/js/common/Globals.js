//This is for all the configuration we need
var app = angular.module("twc");

//FormGlobals set up all the constants that we need
app.factory('Globals', [function() {

    var service = {};
    //service.boxData = boxData;




    service.myAverage = function(a) {
        var r = {mean: 0, variance: 0, deviation: 0,avgErr:0}, t = a.length;
        for(var m, s = 0, l = t; l--; s += a[l]);
        for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
        for(var e=0,l = t; l--; e += Math.abs(a[l]-m));
        return r.deviation = Math.sqrt(r.variance = s / t),r.avgErr=e/t, r;
    };



    return service;

}]);


