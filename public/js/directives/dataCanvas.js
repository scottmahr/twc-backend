//This is the plot we will use for our app
var app = angular.module("twc");


app.directive('datacanvas', ['$window','$timeout','FormState','FormGlobals', 
    function($window,$timeout,FormState,FormGlobals) {
  return {
    restrict: 'A',
    replace:true,
    template: '<div class="datacanvas"></div>',
    link: function(scope, ele, attrs) {
        

        var base = d3.select("#dataCanvas");

        var chart = base.append("canvas")
          .attr("width", 750)
          .attr("height", 608);
        var ctx = chart.node().getContext("2d");
        var vid = document.getElementById('awesome');
        var logo = document.getElementById('logo');

        var dataContainer = base.append("custom");

        var xScale,yScale;

        var val = 0;
        var data = undefined; //_.map(_.range(200),function(i){val += _.random(-.2,.201);return [i/100,val];})
        var cIdx = 0;
        var hipDrive,weight,metrics;
        var seeking = false;
        var seekTime = 0;
        var trimmed = 0;

        function drawCanvas() {

            var h = 608;
            var w = 750;
            var plotH = 158;
            var barH = 45;
            var unitsBar = 33;
            
            

          // clear canvas
          ctx.fillStyle = "#fff";
          ctx.rect(0,0,chart.attr("width"),chart.attr("height"));
          ctx.fill();
          
          /*
          var elements = dataContainer.selectAll("custom.rect");
          elements.each(function(d) {
            var node = d3.select(this);
            
            ctx.beginPath();
            ctx.fillStyle = node.attr("fillStyle");
            ctx.rect(node.attr("x"), node.attr("y"), node.attr("size"), node.attr("size"));
            ctx.fill();
            ctx.closePath();
            
          })
*/

            
            xScale = d3.scale.linear()
                .domain(d3.extent(_.pluck(data,0)))
                .range([unitsBar,w]);

            yScale = d3.scale.linear()
                .domain(d3.extent(_.pluck(data,1)))
                .range([h-10,h-plotH+15]);

            var cTime = data[cIdx][0]; //this is in data units

            ctx.drawImage(vid,0,0,w,h-plotH);

            //draw the bottom rectangle
            ctx.fillStyle = "#F2F2F2";
            ctx.fillRect(0,h-plotH,w,plotH);

            //then the dark bar
            ctx.fillStyle = "#333333";
            ctx.fillRect(0,h-plotH-barH,w,barH);

            //now, lets draw some unit lines
            ctx.fillStyle = "#333333";
            ctx.fillRect(0,yScale(0)-1,w,2);

            //then the other lines for the scale
            var max = _.max(_.pluck(data,1));

            ctx.fillStyle = "#333333";
            ctx.fillRect(unitsBar,yScale(0)-1,w,2);

            ctx.fillRect(unitsBar,yScale(max/2)-1,w,1);

            //then the units bar
            ctx.fillStyle = "#B3B3B3";
            ctx.fillRect(0,h-plotH,unitsBar,plotH);
            ctx.fillStyle = "#000000";
            ctx.fillRect(unitsBar,h-plotH,1,plotH);

            ctx.font =  'bold 14px Arial';
            ctx.fillStyle = "#ff931f";
            ctx.fillText('Applied Force', unitsBar+10, yScale(0)+15);
            

            //and the units
            ctx.font =  'bold 14px Arial';
            ctx.fillStyle = "#000000";
            ctx.fillText('lbs', 3, yScale(0)+4);

            //we need to find what half of the positive scale would be
            ctx.fillText(parseInt((max/2+9.8)/9.8*weight), 3, yScale(max/2)+4);
         

            //lets do time tick marks
            var startTime = data[0][0]
            var t;
            _.each(_.range(16),function(i){
                t = i*.25+startTime;
                ctx.fillRect(xScale(t),h-plotH,1,5);
            });


            //now lets draw the text
            ctx.font =  '24px Arial';
            ctx.fillStyle = "#F2F2F2";
            ctx.fillText('CLEAN               225 lbs', 20, h-plotH-14);

            ctx.font =  '18px Arial';
            
            var t = parseInt(data[cIdx][0]*100)/100+'';
            //if(t.length<4){t+='0';}
            //ctx.fillText(t+' / 4.00 sec', 150, h-plotH-13);

            //ctx.font =  '16px Arial';
            //ctx.fillText('lbs', 155, h-plotH-16);

            ctx.font =  '22px Arial';
            ctx.fillText('MAX HIP DRIVE:', 340, h-plotH-14);

            ctx.font =  '24px Arial';
            ctx.fillStyle = "#00ff00";
            ctx.fillText('598 lbs (2.66 ratio)', 530, h-plotH-14);

            //ctx.font =  '20px Arial';
            //ctx.fillStyle = "#00ff00";
            //ctx.fillText('lbs             %', 480, h-plotH-13);


            //quickly figure out the limits of the catch
            var sCatch,eCatch;
            for(var i = metrics.catchIdx-trimmed; i<data.length; i++) {
                if(data[i][1] <= 0){
                    eCatch = i;
                    break;
                }
            }
            for(var i = metrics.catchIdx-trimmed; i>0; i--) {
                if(data[i][1] <= 0){
                    sCatch = i;
                    break;
                }
            }

            console.log(metrics.startIdx,metrics.transitionIdx,sCatch,eCatch)
            //lets fill in the curves
            fillSpace(metrics.startIdx,metrics.transitionIdx,'#51B97E','First Pull');
            fillSpace(metrics.transitionIdx,metrics.floatIdx,'#E59C4D','Hip Drive');
            fillSpace(sCatch+trimmed+1,eCatch+trimmed,'#AB2E33','Catch');


            //now, lets try to draw a curve


            
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ff931f';
            ctx.beginPath();
            ctx.moveTo( xScale(data[0][0]), yScale(data[0][1]));
            _.each(data,function(pt){
                ctx.lineTo( xScale(pt[0]), yScale(pt[1]));
            });
            ctx.lineJoin = 'round';
            ctx.stroke();

            //now shade the stuff after the current time
            ctx.fillStyle = "#333333";
            ctx.globalAlpha=0.2;
            ctx.fillRect(xScale(cTime)+1,h-plotH,w,plotH);
            ctx.globalAlpha=1;

            //draw the tape line
            ctx.fillRect(xScale(cTime)-1,h-plotH,2,plotH);

            //draw the triangle head
            ctx.beginPath();
            ctx.moveTo(xScale(cTime)-6,h-plotH);
            ctx.lineTo(xScale(cTime)+6,h-plotH);
            ctx.lineTo(xScale(cTime),h-plotH+12);
            ctx.closePath();
            ctx.fill();

            //now, draw the flags with the values

            ctx.beginPath();
            ctx.moveTo(xScale(cTime)-6,h-plotH);
            ctx.lineTo(xScale(cTime)+6,h-plotH);
            ctx.lineTo(xScale(cTime),h-plotH+12);
            ctx.closePath();
            ctx.fill();

            drawFlag(data[hipDrive[0]][0],data[hipDrive[0]][1],"#00ff00",hipDrive[1])
            drawFlag(data[cIdx][0],data[cIdx][1],"#ff931f",parseInt((data[cIdx][1]+9.8)/9.8*weight))



            //and we can draw the logo
            ctx.drawImage(logo,15,15, 130, 130/1.26);


        }

        function fillSpace(sIdx,eIdx,c,txt){
            ctx.fillStyle = c;
            ctx.beginPath();

            var start = xScale(data[sIdx-trimmed][0]);
            var end = xScale(data[eIdx-trimmed][0]);

            ctx.moveTo(start,yScale(0));

            var draw = true;
            _.each(_.slice(data,sIdx-trimmed,eIdx-trimmed+1),function(d){
                if(d[1]<0){ 
                    draw = false; 
                    ctx.lineTo(xScale(d[0]),yScale(0));

                }
                if(draw){
                    ctx.lineTo(xScale(d[0]),yScale(d[1]));
                    end = xScale(d[0]);
                }
                
            })
            if(draw){
                ctx.lineTo(xScale(data[eIdx-trimmed][0]),yScale(0));
            }
            ctx.closePath();
            ctx.fill();

            //now put some text below it
            ctx.font =  'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(txt, start+(end-start)/2, yScale(0)+15);
            ctx.textAlign = 'left';

        }


        function drawFlag(x,y,c,txt){

            ctx.fillStyle = c;
            x = xScale(x);
            y = yScale(y);

            var flagLen = 65;
            if(txt<100){flagLen=55;}

            ctx.beginPath();
            ctx.moveTo(x,y);
            ctx.lineTo(x+20,y+10);
            ctx.lineTo(x+flagLen,y+10);
            ctx.lineTo(x+flagLen,y-10);
            ctx.lineTo(x+20,y-10);
            ctx.closePath();
            ctx.fill();

            //now, draw the text
            ctx.font =  'bold 18px Arial';
            ctx.fillStyle = "#000000";
            ctx.fillText(txt, x+25, y+7);

        }


        scope.$on('newData', function (event, d) {
            //console.log()

            if(!data && scope.s.lift()){

                metrics = scope.s.lift().metrics;
                weight = scope.s.lift().weight;
                var accel = scope.s.lift().acceleration;
                data = FormGlobals.mySmooth2(accel, _.range(1,25,0));

                trimmed = metrics.startIdx-100;
                data = _.slice(data,trimmed,metrics.catchIdx+150)
                hipDrive = [metrics.hipDriveIdx-trimmed,
                    parseInt((metrics.hipDrive+9.8)/9.8*weight)]


                console.log(metrics)
                console.log('vid',vid.width,vid.height)
            }


            if(scope.m.record && !seeking){
                if(scope.m.sloMo && false){
                    console.log('slowmo')
                    seekTime += .5/29.97;
                }else{
                    seekTime += 1/29.97;
                }

                if(seekTime>data[data.length-1][0]){
                    seekTime = 0;
                }

                cIdx = _.findIndex(data, function(d) {
                  return d[0]>seekTime;
                });

                //console.log('cidx',cIdx)

                //cIdx++;
                if(cIdx<0){cIdx=0;}
                if(cIdx>=data.length){cIdx=data.length-1;}
                vid.currentTime = seekTime+1.97;
                seeking = true; 
                //console.log(data[cIdx][0])

            }


        });

        vid.onseeked = function() {
            //console.log("Seek operation completed!");
            $timeout(function(){
                drawCanvas();

                var dur = 1000/29.97;
                if(scope.m.sloMo){
                    dur = 3000/29.97
                }
                scope.m.encoder.add(ctx,dur);
                seeking = false;
            },200);
            
        };

        //drawCanvas();
        //drawCustom([1,2,12,16,20]);



    }




  }
}]);