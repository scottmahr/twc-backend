//This is the plot we will use for our app
var app = angular.module("twc");


app.directive('lineplot',  function($window,FormGlobals) {
  return {
    restrict: 'A',
    scope: {
        plotIdx: "@plotidx"
    },
    replace:true,
    template: '<div class="lineplot"></div>',
    link: function(scope, ele, attrs) {
        var margin = {top: 5, right: 5, bottom: 5, left: 5};

        var w= 1000; //parseInt($window.innerWidth) - margin.left - margin.right;
        var h= 500; //parseInt(.25*$window.innerHeight)- margin.top - margin.bottom;
        var svg = d3.select(ele[0]).append('svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
            
        


        var paths = [svg.append('path'),
                     svg.append('path'),
                     svg.append('path'),
                     svg.append('path')];

        var zeroLines = [svg.append("line"),svg.append("line"),svg.append("line")];



        var text = [];



        //Setting up the zero line
        //'#51b97e'

        var colors = ['#c26f27','#0000ff','#e73827','#c0c0c0']

        var legendWidth = 40;
        var xAxisHeight = 10;
        var legendOffsets = [0,h*.07,-h*.07,h*.14];
        var extents,scales;



        
        scope.updateChart = function(raw,ranges,circles,yaxes){
           
            //set up the data and the scales
            if(yaxes==undefined){yaxes = [0,1,2,3];}


            //console.log(filteredData)
            if(ranges==undefined){
                extents = _.map(raw,function(d){
                return {
                    'x':d3.extent(_.pluck(d,0)),
                    'y':d3.extent(_.pluck(d,1))
                    }
                });
            }else{
                 extents = _.map(raw,function(d,i){
                return {
                    'x':d3.extent(_.pluck(d,0)),
                    'y':ranges[i]
                    }
                });
            }
            


            scales = _.map(extents,function(ext){
                return{ 'x': d3.scale.linear()
                                .domain(ext.x)
                                .range([0,w-legendWidth]),
                        'y': d3.scale.linear()
                                .domain(ext.y)
                                .range([h-xAxisHeight, 0])
                    }
                });

            

            svg.selectAll("text").remove();
            
            _.each([.1,.5,.9],function(pct,lineIdx){
                //first, draw the lines
                var val = extents[0].y[0]+pct*(extents[0].y[1]-extents[0].y[0]);
                zeroLines[lineIdx]
                     .attr("x1", 0)
                     .attr("y1", scales[0].y(val))
                     .attr("x2", w-legendWidth)
                     .attr("y2", scales[0].y(val))
                     .attr("stroke-width", 1)
                     .attr("stroke", "#283440");

                _.each(extents,function(extent,idx){
                    var val = extents[yaxes[idx]].y[0]+pct*(extents[yaxes[idx]].y[1]-extents[yaxes[idx]].y[0]);
                    var txt = svg.append("text")
                     .attr("text-anchor", "middle")
                     .text(function(d) {
                       return  FormGlobals.roundSigFigs(val,3);
                      })
                      .attr("font-size", h*.05)
                      .attr("fill", colors[idx])
                      .attr("font-family", 'AvenirLT')
                      .attr("font-weight", '200')
                      .attr("transform", "translate("+(w-legendWidth/2)+","+(scales[yaxes[idx]].y(val)+h*.025 + legendOffsets[idx])+")");
                });

            });



            //draw text for x scale
            var txt = svg.append("text")
             .attr("text-anchor", "middle")
             .text(function(d) {
               return  raw[0][0][0];
              })
              .attr("font-size", h*.05)
              .attr("fill", colors[0])
              .attr("font-family", 'AvenirLT')
              .attr("font-weight", '200')
              .attr("transform", "translate("+(15)+","+(h-xAxisHeight/2)+")");

            var txt = svg.append("text")
             .attr("text-anchor", "middle")
             .text(function(d) {
               return  raw[0][raw[0].length-1][0];
              })
              .attr("font-size", h*.05)
              .attr("fill", colors[0])
              .attr("font-family", 'AvenirLT')
              .attr("font-weight", '200')
              .attr("transform", "translate("+(w-legendWidth-20)+","+(h-xAxisHeight/2)+")");

            var txt = svg.append("text")
             .attr("text-anchor", "middle")
             .text(function(d) {
               return  raw[0][parseInt(raw[0].length/2)][0];
              })
              .attr("font-size", h*.05)
              .attr("fill", colors[0])
              .attr("font-family", 'AvenirLT')
              .attr("font-weight", '200')
              .attr("transform", "translate("+((w-legendWidth)/2)+","+(h-xAxisHeight/2)+")");
                
                

            
            
            
            //console.log(scales)
            //Draw the zero line and the grid lines
          //  zeroLine
          //      .attr("y1", yScale(0))
           //     .attr("y2", yScale(0));  

            //Drawing the force line here   
            _.each(raw,function(d,idx){
                var line = d3.svg.line()
                    //.interpolate('basis-open')
                    .interpolate('linear')
                    .x(function(d) {
                        return scales[idx].x(d[0]);
                    })
                    .y(function(d) {
                        return scales[yaxes[idx]].y(d[1]);
                    });

                paths[idx]
                    .datum(d)
                    .transition()
                    .duration(100)
                    .attr('d',line)
                    .attr("stroke", colors[idx])
                    .attr("stroke-width", '2px')
                    .attr("fill", 'none')

            });


            //lastly, draw any circles we need to draw
            svg.selectAll("circle").remove();
            _.each(circles,function(c){
                if(c[2]==undefined || c[3]==undefined){return;}

                var circle1 = svg.append("circle")
                  .attr("cx", scales[c[1]].x(c[2]))
                  .attr("cy", scales[yaxes[c[1]]].y(c[3]))
                  .attr("r", 4)
                  .attr("fill",c[0]);
            })




        }



        scope.$on('linePlot', function (event, data) {
            

            //console.log('got msg, me:'+scope.plotIdx+": to: " + data.plotIdx)
            if(data.plotIdx == parseInt(scope.plotIdx)){

                scope.updateChart(data.raw,data.ranges,data.circles,data.yaxes);
            }

        });


    }
  }
});