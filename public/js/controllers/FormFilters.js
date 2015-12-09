var app = angular.module("twc");


app.filter('metricTxt', function(FormGlobals) {
    return function(metricID){
        var metric = _.findWhere(FormGlobals.metricMaster,{'key':metricID});
        if(metric==undefined){return 'na';}
        return metric.name.toUpperCase()
    }
});

app.filter('metricVal', function(FormGlobals) {
    return function(metricID,metrics){
        var val = metrics[metricID];
        var metric = _.findWhere(FormGlobals.metricMaster,{'key':metricID})
        if(metric==undefined){return 'na';}
        //hyper.log('metric: '+metricID+':'+val);


        var unit = metric.units;
        //Now, round the val to the right spot
        
        var rounded = FormGlobals.roundSigFigs(val,3);
        //hyper.log('rounded: '+metricID+':'+rounded);
        if(isNaN(rounded)){rounded  = '--';}
        
        if(unit=='lbsf'){unit='lbs';}

        return rounded+' '+unit;
    }
});

app.filter('rnd', function() {
    return function(num){
        
        return parseInt(num);
    }
});

app.filter('dt', function() {
    return function(num){
        if(!num){return '';}
        return (new Date(num)).toString().slice(0,24);
      
    }
});

app.filter('weight',['FormState', function(FormState) {
    return function(num,type){
        var wTypes = ['primary','secondary'];
        var wType = (FormState.options.weightUnits.selected+wTypes.indexOf(type))%2;
        if(wType==0){
            return parseInt(num*0.45359237)+' KG';
        }else{
            return parseInt(num)+' LBS';
        }
    }
}]);

