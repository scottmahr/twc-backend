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



app.filter('titlecase', function () {
    return function (input) {
      if(!input){return '';}
      var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

      return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
        if (index > 0 && index + match.length !== title.length &&
          match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
          (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
          title.charAt(index - 1).search(/[^\s-]/) < 0) {
          return match.toLowerCase();
        }

        if (match.substr(1).search(/[A-Z]|\../) > -1) {
          return match;
        }

        return match.charAt(0).toUpperCase() + match.substr(1);
      });
    }
  })