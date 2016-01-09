//This is for all the configuration we need
var app = angular.module("twc");

//FormMetrics has all of the methods that will deal with metrics
app.factory('DropIns', ['Restangular', 'State' ,'EditState' ,
            function(Restangular, State,EditState) {

     //Setting up dropIn stuff
    var dropInsBase = Restangular.all('dropins');
    
    
    

    var service = {};

    service.getDropIns = function(){
        var dropInsList =  dropInsBase.getList();
        dropInsList.then(function(dropInsResult) {
            console.log("Got dropIns:"+dropInsResult.length)
            //console.log(dropInsResult[2])
            State.dropIns = dropInsResult;
            },function(error) {
                console.log("error"+error)
        } );
    };


    //this is the private delete dropIn function
    service.deleteDropIn = function(dropIn){
        //console.log('deleting:',dropIn)
        dropIn.remove().then(function(){
            State.dropIns = _.filter(State.dropIns, function(u){return u._id != dropIn._id;});
            State.toast('dropIn deleted')
        },function(){
            State.toast('Error deleting dropIn')
            console.log('error deleting dropIn');
        });
        
    }

    //this is the private update dropIn function
    service.updateDropIn = function(dropIn, updates){
        _.each(updates,function(v,k){
            dropIn[k] = v;
        });

        dropIn.put().then(function(){
            console.log('dropIn updated');
            State.toast('dropIn updated')
        },function(){
            console.log('error updating dropIn');
            State.toast('Error updatiung dropIn')
        });
    };

    //this is the private create dropIn
    service.createDropIn = function(dropIn){
        dropInsBase.post(dropIn).then(function(dropIn){
            if(_.has(dropIn,'error')){
                console.log('error in the create dropIn post:'+JSON.stringify(dropIn));
            }else{
                console.log(JSON.stringify(dropIn));
                State.dropIns.push(dropIn);
                console.log("we have this many dropIns now:"+State.dropIns.length)
            }
            
        },function(err){
            console.log('error in the create dropIn post:'+JSON.stringify(err));
        });
    }



    
    service.getDropIns();

    return service;
}]);

