//This is for all the configuration we need
var app = angular.module("twc");



//FormState should be all the state variables we will care about
//Anything that is used around app should be here
//There will be other factories that will manipulate this data
app.factory('State', ['$state','$timeout','$http','Globals',
                function($state,$timeout,$http,Globals) {
    //up here are private variables
    var dt = new Date();
    
    var service =  {

        users : [],  //This is the liftTypeID of the current lift
        boxes : [],
        dropIns : [],
        selectedUser : undefined,
        selectedBox : undefined,
       
        stars : 3,

        boxID:undefined,
        //
        serverResponse: "",
        updateAvaliable: false,

        //facebook 
        facebookID : "",
        facebookUserInfo : undefined,
        facebookLoginInfo : undefined,
        facebookFriends : undefined,
        loggedInUser : undefined,

       scannedText:"",
       scannedUser:undefined,

        updateAvaliable : undefined,

       myLat:34,
       myLong:-118,
       recenter: true,
       locMarker: undefined,

       closeBoxes: [], //distance, box


    }





    service.rndVerb = function(idx){
        var verbs = ['dropped in at','checked out','had a great time at','broke a sweat at','made new friends at'];
        return  verbs[idx%verbs.length] //_.sample(verbs);
    }



    service.userDropIns = function(userID){
        return _.filter(service.dropIns, function(u){return u.userID == userID;});
    }
    service.userFeed = function(userID){
        return _.filter(service.dropIns, function(u){return u.userID != userID;});
    }
        
    service.boxFeed = function(boxID){
        return _.filter(service.dropIns, function(u){return u.boxID == boxID;});
    }

    service.userName = function(userID){
        var user = _.findWhere(service.users,{'_id':userID});
        if(!!user){return user.name;}
        return '';
    }

    service.boxName = function(boxID){
        var box = _.findWhere(service.boxes,{'_id':boxID});
        if(!!box){return box.name;}
        return '';
    }
    service.boxLogo = function(boxID){
        var box = _.findWhere(service.boxes,{'_id':boxID});
        if(!!box){return box.logoID;}
        return '';
    }

    service.userPts = function(userID){
        //now get all the ratings and average them
        //console.log(service.dropIns)
        var dropIns = _.filter(service.dropIns, function(u){
            return u.userID == userID;
        })
        //console.log(dropIns)
        var pts =  _.reduce(dropIns, function(total, dropIn) {
            //console.log(total)
            if(dropIn.rating>0){return total+2;}
            return total+1;
        },0);
        //console.log('pts',pts)
        return pts;

    }

    service.boxRating = function(boxID){
        //now get all the ratings and average them
        var dropIns = _.filter(service.dropIns, function(u){
            return (u.boxID == boxID) && (u.rating>0);
        })
        if(dropIns.length==0){return false;}
        var score = Globals.myAverage(_.pluck(dropIns,'rating')).mean;
        //console.log(score);
        return score;
    }

    service.userPic = function(userID){
        var user = _.findWhere(service.users,{'_id':userID});
        if(!!user){return user.photoURL;}
        return '';
    }
//

    //this sees if we are already logged on
    service.loadUser  = function(){
        return;
        var userEmail =  localStorage.getItem("userEmail");
        var userZip =  localStorage.getItem("userEmail");
        if(userID){
            console.log('loading user from local storage')
            var user = _.findWhere(service.users,{'_id':userID});
            if(!!user){
                service.selectedUser = user;
                $state.go('tab.passport');
            }
            else{
                $state.go('landing');
            }
        }
    }

    service.syncBoxInfo = function(){
        $http.get("http://travelwodclub.herokuapp.com/api/updateBoxes",{}).then(
            function(data, status, headers){
                        console.log('success')
                        console.log(data)
                        confirm("Successfully updated "+data.data.length+" boxes")
            },
            function(data, status, headers){
                        console.log('error',data,status)
            }
        )

    }

    

    return service;

}]);








   





