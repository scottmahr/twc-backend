//This is for all the configuration we need
var app = angular.module("twc");

//FormMetrics has all of the methods that will deal with metrics
app.factory('Users', ['$rootScope','Restangular', 'State','EditState' ,
            function($rootScope, Restangular, State, EditState) {

    //Setting up box stuff
    var usersBase = Restangular.all('users');
    var usersList =  usersBase.getList();
    
    usersList.then(function(usersResult) {
        console.log("Got Users:"+usersResult.length)
        //console.log(usersResult[2])
        State.users = usersResult;
    },function(error) {
        console.log("error"+error)
    } );


    var service = {};

    //this is the private delete user function
    service.deleteUser = function(user){
        if(!user){return;}
        user.remove().then(function(){
            State.users = _.filter(State.users, function(u){return u._id != user._id;});
            if(State.selectedUser._id==user._id){
                State.selectedUser = undefined;
            }
            State.toast('User deleted')
        },function(){
            State.toast('Error deleting user')
            console.log('error deleting user');
        });
        
    }

    //this is the private update user function
    service.updateUser = function(user, updates){
        if(!user){return;}
        _.each(updates,function(v,k){
            user[k] = v;
        });
//

        if(!_.has(user,'put')){
            console.log('making it a restangular thing')
            user = Restangular.restangularizeElement('', user, 'users')
        }


        user.put().then(function(){
            console.log('user updated');
            State.toast('User updated')
        },function(){
            console.log('error updating user');
            State.toast('Error updatiung user')
        });
    };

    //this is the private create user
    service.createUser = function(user){
        if(!user){return;}
        usersBase.post(user).then(function(user){
            //console.log(JSON.stringify(user));
            State.users.push(user);
            console.log("we have this many users now:"+State.users.length)
        },function(){
            console.log('error in the create user post');
        });
    }



    


    return service;
}]);

