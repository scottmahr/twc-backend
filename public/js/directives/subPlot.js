//This is the plot we will use for our app
var app = angular.module("twc");


app.directive('subplot', ['$window','State', function($window,State) {
  return {
    restrict: 'A',
    replace:true,
    template: '<div class="cashplot"></div>',
    link: function(scope, ele, attrs) {
        var margin = {top: 5, right: 5, bottom: 5, left: 5};

        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        //So I'm able to fit my plot to the user's window like this :

        var sideBar = 420;
        if(x<1201){sideBar=120;}

        var w=x-sideBar - margin.left - margin.right;
        var h=400- margin.top - margin.bottom;
        var svg = d3.select(ele[0]).append('svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
            
        //first, lets analyze everything

        _.each(State.subscriptions,function(sub){
            State.analyzeSubscription(sub);
        });


        var paths = _.map(_.range(State.subscriptions.length+1),function(){return svg.append('path')});

        var zeroLines = [svg.append("line"),svg.append("line")];  //x and y

        var text = [];


        //Setting up the zero line
        //'#51b97e'

        var colors = State.colors;

        var legendWidth = 60;
        var xAxisHeight = 100;




        //let's assemble the data
        var subs = _.map(State.subscriptions,function(sub){
            return sub.subscriptions;
        });

        var total = _.map(_.range(subs[0].length),function(i){
            return _.sum(_.pluck(subs,i));
        });

        //console.log('subs',subs)
        //console.log('total',total)

        var raw = [total].concat(subs);

        //console.log('raw',raw)

        

        //console.log(filteredData)
        

        
        var drawStuff = function(){

            var scales = { 'x': d3.scale.linear()
                          .domain([0,State.analysisDuration-1])
                          .range([legendWidth,w]),
                  'y': d3.scale.linear()
                          .domain( [-10,d3.max(_.flatten(raw))] )
                          .range([h-xAxisHeight, 0])
            };


          

            svg.selectAll("text").remove();
          
            _.each(State.subscriptions,function(sub,idx){
                //draw text for x scale
                var txt = svg.append("text")
               .attr("text-anchor", "middle")
               .text(function(d) {
                 return  sub.name;
                })
                .attr("font-size", 20)
                .attr("fill", colors[idx+1])
                .attr("transform", "translate("+((2+idx)*w/(State.subscriptions.length+2))+","+
                      (h-xAxisHeight/2)+")");

            });
            var txt = svg.append("text")
               .attr("text-anchor", "middle")
               .text(function(d) {
                 return  "Total";
                })
                .attr("font-size", 20)
                .attr("fill", colors[0])
                .attr("transform", "translate("+(w/(State.subscriptions.length+2))+","+
                      (h-xAxisHeight/2)+")");

            //Draw the zero line and the grid lines


            var format = d3.format(",");
            //Define X axis
            var xAxis = d3.svg.axis()
                            .scale(scales.x)
                            .orient("bottom")
                            .tickFormat(function(d){
                              return 'y'+(parseInt(d/12)+1)+'-m'+(d%12+1);
                            })
                            //.ticks(5);

            //Define Y axis
            var yAxis = d3.svg.axis()
                            .scale(scales.y)
                            .orient("left")
                            .tickFormat(format)
                            //.ticks(5);

            svg.selectAll("g").remove();

            //Create X axis
            svg.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + (h-xAxisHeight ) + ")")
              .call(xAxis);
          
            //Create Y axis
            svg.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(" + legendWidth + ",0)")
              .call(yAxis);



            //Drawing the force line here   
            _.each(raw,function(d,idx){
                var line = d3.svg.line()
                  //.interpolate('basis-open')
                  .interpolate('linear')
                  .x(function(d,i) {
                      return scales.x(i);
                  })
                  .y(function(d,i) {
                      return scales.y(d);
                  });

                paths[idx]
                  .datum(d)
                  .attr('d',line)
                  .attr("stroke", colors[idx])
                  .attr("stroke-width", '2px')
                  .attr("fill", 'none')
                  .on("mousemove", mousemove);

            });
  
            var dollars = svg.append("text")
               .attr("text-anchor", "middle")
               .text(function(d) {
                 return  "Cursor Value";
                })
                .attr("font-size", 20)
                .attr("transform", "translate(150,10)");


            function mousemove() {                                 
                //console.log('here',scales.x.invert(d3.mouse(this)[0]),':',scales.y.invert(d3.mouse(this)[1]))
                dollars.text(function(d) {
                    return  format(  parseInt(scales.y.invert(d3.mouse(this)[1]))  );
                })
            } 
        }

        function updateWindow(){

            x = w.innerWidth || e.clientWidth || g.clientWidth;
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;
            console.log('resize',x,y)

            sideBar = 420;
            if(x<1201){sideBar=120;}

             w=x-sideBar - margin.left - margin.right;
            h=400- margin.top - margin.bottom;
            svg
                .attr('width', w + margin.left + margin.right)
                .attr('height', h + margin.top + margin.bottom)

            drawStuff();
        }
        window.onresize = updateWindow;
        drawStuff();


    }
}}]);