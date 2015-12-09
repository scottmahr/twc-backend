//This is for all the configuration we need
var app = angular.module("twc");

//FormMetrics has all of the methods that will deal with metrics
app.factory('Boxes', ['Restangular', 'State' ,'EditState' ,
            function(Restangular, State,EditState) {

     //Setting up box stuff
    var boxesBase = Restangular.all('boxes');
    var boxesList =  boxesBase.getList();
    
    boxesList.then(function(boxesResult) {
        console.log("Got boxes:"+boxesResult.length)
        State.boxes = boxesResult;
        EditState.updateNearGyms();
    },function(error) {
        console.log("error"+error)
    } );

    var service = {};

    //this is the private delete box function
    service.deleteBox = function(box){
        console.log('deleting:',box)
        box.remove().then(function(){
            State.boxes = _.filter(State.boxes, function(u){return u._id != box._id;});
            if(State.selectedBox._id==box._id){
                State.selectedBox = undefined;
            }
            State.toast('Box deleted')
        },function(){
            State.toast('Error deleting box')
            console.log('error deleting box');
        });
        
    }

    //this is the private update box function
    service.updateBox = function(box, updates){
        _.each(updates,function(v,k){
            box[k] = v;
        });

        box.put().then(function(){
            console.log('box updated');
            State.toast('Box updated')
        },function(){
            console.log('error updating box');
            State.toast('Error updatiung box')
        });
    };

    //this is the private create box
    service.createBox = function(box){
        boxesBase.post(box).then(function(box){
            if(_.has(box,'error')){
                console.log('error in the create box post:'+JSON.stringify(box));
            }else{
                console.log(JSON.stringify(box));
                State.boxes.push(box);
                console.log("we have this many boxes now:"+State.boxes.length)
            }
            
        },function(err){
            console.log('error in the create box post:'+JSON.stringify(err));
        });
    }



    


    return service;
}]);

