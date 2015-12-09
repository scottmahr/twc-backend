//This is the plot we will use for our app
var app = angular.module("twc");
var test = 'boom'


app.directive('formplot',  function(FormData,FormGlobals, $window) {
  return {
    restrict: 'A',
    scope: {},
    replace:true,
    template: '<div id="plot" ></div>',
    link: function(scope, ele, attrs) {
        var margin = {top: 0, right: 0, bottom: 0, left: 0};
        var w=parseInt($window.innerWidth) - margin.left - margin.right;
        var h=parseInt(.224*$window.innerHeight)- margin.top - margin.bottom;
        var svg = d3.select(ele[0]).append('svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
            
        var path = svg.append('path');
        var phase1 = svg.append('path');
        var phase2 = svg.append('path');

        //svg.selectAll("path").on("click", function(d, i){
        //    alert('clicked'+i);
        //});


        //Setting up the zero line
        var zeroLine = svg.append("line")
             .attr("x1", 0)
             .attr("y1", 0)
             .attr("x2", w)
             .attr("y2", 0)
             .attr("stroke-width", 1)
             .attr("stroke", "#283440");


        scope.drawPhase = function(data,cls,phase,x,y){
            //Drawing the first phase
            var area = d3.svg.area()
                .x(function(d) {
                    return x(d[0]);
                })
                .y0(function(d) {
                    return y(0);
                })
                .y1(function(d) {
                    return y(d[1]);
                });

            phase
                .classed('hideMe', false)
                .datum(data)
                .transition()
                .duration(500)
                .attr('d',area)
                .attr('class',cls);
                

        };


        scope.updateChart = function(){
           
            //set up the data and the scales
            var lift = FormData.getSelLift();


            //First, get the accel data
            var time = _.pluck(lift.kalman,0);
            var accel = _.pluck(lift.kalman,1);
            accel = FormGlobals.mySmooth(accel,[1,1,1,1,2,2,3,2,2,1,1,1,1]);

            var data = _.zip(time,accel);

            if(lift.metrics['catchIdx'] && lift.metrics['catchIdx']<accel.length+201){
                time = time.slice(0,lift.metrics['catchIdx']+200)
                accel = accel.slice(0,lift.metrics['catchIdx']+200)
                data = data.slice(0,lift.metrics['catchIdx']+200)
            }


            var xScale = d3.scale.linear()
                .domain(d3.extent(time))
                .range([0,w]);

            var yScale = d3.scale.linear()
                .domain(d3.extent(accel))
                .range([h, 0]);


            //Next, get the data for the phases
            //Check if the lift has the right data
            if(lift.metrics['startIdx']!= undefined && lift.metrics['dipIdx']!= undefined){
                var midPhase = lift.metrics['startIdx']+(lift.metrics['dipIdx']-lift.metrics['startIdx'])/2;
                var endPhase =  _.indexOf(accel,_.find(accel.slice(midPhase,accel.length), function(n){return n<0;}));
                var d = data.slice(lift.metrics['startIdx'],endPhase)
                scope.drawPhase(d,'phase1Area',phase1,xScale,yScale)
            }else{
                phase1.classed('hideMe', true);
            }
            if(lift.metrics['dipIdx']!= undefined && lift.metrics['hipDriveIdx']!= undefined){
                //we need to find when accel goes negative after the hip drive
                var midPhase = lift.metrics['hipDriveIdx'];
                var startPhase = lift.metrics['dipIdx'];
                _.each(accel.slice(0,midPhase), function(n,idx){if(n<0 && idx>startPhase)startPhase=idx;});
                var endPhase =  _.indexOf(accel,_.find(accel.slice(midPhase,accel.length), function(n){return n<0;}));

                var d = data.slice(startPhase,endPhase)
                scope.drawPhase(d,'phase2Area',phase2,xScale,yScale)
            }else{
                phase2.classed('hideMe', true);
            }
            



            //Draw the zero line and the grid lines
            zeroLine
                .attr("y1", yScale(0))
                .attr("y2", yScale(0));

            //Drawing the force line here
            var line = d3.svg.line()
                .interpolate('basis-open')
                .x(function(d) {
                    return xScale(d[0]);
                })
                .y(function(d) {
                    return yScale(d[1]);
                });


            path
                .datum(data)
                .transition()
                .duration(500)
                .attr('d',line)
                .attr('class','accelPath');
            
            




        }

        scope.updateChart();


        scope.$on('newLiftSelected', function (event, data) {
            scope.updateChart();
        });


   
    }
  }
});