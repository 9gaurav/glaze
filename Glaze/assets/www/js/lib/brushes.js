 function ghostShaded( mouseX, mouseY )
	{
		var i, dx, dy, d;

		points.push( [ mouseX, mouseY ] );

		for (i = 0; i < points.length; i++)
		{
			dx = points[i][0] - points[count][0];
			dy = points[i][1] - points[count][1];
			d = dx * dx + dy * dy;

			if (d < 1000)
			{
				ghostCtx.strokeStyle = "rgba(" + canvasColor[0] + ", " + canvasColor[1] + ", " + canvasColor[2] + ", " + ((1 - (d / 1000)) * 0.1 * brushPRESSURE) + " )";

				ghostCtx.beginPath();
				ghostCtx.moveTo( points[count][0], points[count][1]);
				ghostCtx.lineTo( points[i][0], points[i][1]);
				ghostCtx.stroke();
				 brushStroke =brushStroke+points[count][0]+','+points[count][1]+'*'+points[i][0]+','+points[i][1]+'_';
			}
		}

		brushLastX = mouseX;
		brushLastY = mouseY;

		this.count ++;
	}

	
	function drawShaded(str){
           
                    var unScore = str.split('_');
                    
                       for(var i=0; i<unScore.length-1; i++){
                         var tmp = unScore[i].split('*'); 
                              var t1 = tmp[0].split(',');
                              var t2 = tmp[1].split(',');

                             var tmpX = t1[0];
                             var tmpY= t1[1];
                             var tmpA = t2[0];
                             var tmpB= t2[1];
                             ctx.beginPath();
                             ctx.moveTo(tmpX, tmpY);
                             ctx.lineTo( tmpA,tmpB);
                             ctx.stroke();
                         
                       }// for end

          } // end drawFur
	

    function ghostFur( mouseX, mouseY )
  {

    var i, dx, dy, d;
  
   
   // var points = strToPoint(brushStroke);
    points.push([ mouseX, mouseY ] );
   
    ghostCtx.beginPath();
    ghostCtx.moveTo(brushLastX, brushLastY);
    ghostCtx.lineTo(mouseX, mouseY);
    ghostCtx.stroke();
    brushStroke =brushStroke+brushLastX+','+brushLastY+'*'+mouseX+','+mouseY+'_';

    for (i = 0; i <points.length; i++)
    {
      dx = points[i][0] - points[count][0];
      dy = points[i][1] - points[count][1];
      d = dx * dx + dy * dy;

      if (d < 2000 && Math.random() > d / 2000)
      {
        ghostCtx.beginPath();
        ghostCtx.moveTo( mouseX + (dx * 0.5), mouseY + (dy * 0.5));
        ghostCtx.lineTo( mouseX - (dx * 0.5), mouseY - (dy * 0.5));
        ghostCtx.stroke();
         brushStroke =brushStroke+( mouseX + (dx * 0.5))+','+(mouseY + (dy * 0.5))+'*'+(mouseX - (dx * 0.5))+','+(mouseY - (dy * 0.5))+'_';
      }
    }

    brushLastX = mouseX;
    brushLastY = mouseY;

    count ++;
  }

          function drawFur(str){
           
                    var unScore = str.split('_');
                    
                       for(var i=0; i<unScore.length-1; i++){
                         var tmp = unScore[i].split('*'); 
                              var t1 = tmp[0].split(',');
                              var t2 = tmp[1].split(',');

                             var tmpX = t1[0];
                             var tmpY= t1[1];
                             var tmpA = t2[0];
                             var tmpB= t2[1];
                             ctx.beginPath();
                             ctx.moveTo(tmpX, tmpY);
                             ctx.lineTo( tmpA,tmpB);
                             ctx.stroke();
                         
                       }// for end

          } // end drawFur



           function ghostPencil( mouseX, mouseY )
     {

     if($("#slider-1").val()>1) {
               setCanvasLineWidth(1);
              $("#slider-1").val(1);
              $('#slider-1').slider('refresh');
            }
      ghostCtx.beginPath();
        ghostCtx.moveTo(brushLastX,brushLastY);
        ghostCtx.lineTo( mouseX, mouseY);
        ghostCtx.stroke();
        brushStroke =brushStroke+brushLastX+','+brushLastY+'*'+mouseX+','+mouseY+'_';
          brushLastX = mouseX;
          brushLastY = mouseY;
       
      }

       function drawPencil(str){
            
            if($("#slider-1").val()>1) {
               setCanvasLineWidth(1);
              $("#slider-1").val(1);
              $('#slider-1').slider('refresh');
            }
                    var unScore = str.split('_');
                    
                       for(var i=0; i<unScore.length-1; i++){
                         var tmp = unScore[i].split('*'); 
                              var t1 = tmp[0].split(',');
                              var t2 = tmp[1].split(',');

                             var tmpX = t1[0];
                             var tmpY= t1[1];
                             var tmpA = t2[0];
                             var tmpB= t2[1];
                             ctx.beginPath();
                             ctx.moveTo(tmpX, tmpY);
                             ctx.lineTo( tmpA,tmpB);
                             ctx.stroke();
                         
                       }// for end

          } // end drawFur



               function ghostBallPen( mouseX, mouseY )
     {

     
      if($("#slider-1").val()!=3) {
               setCanvasLineWidth(3);
              $("#slider-1").val(3);
              $('#slider-1').slider('refresh');
            }
      ghostCtx.beginPath();
      ghostCtx.lineCap = 'round';
        ghostCtx.moveTo(brushLastX,brushLastY);
        ghostCtx.lineTo( mouseX, mouseY);
        ghostCtx.stroke();
        brushStroke =brushStroke+brushLastX+','+brushLastY+'*'+mouseX+','+mouseY+'_';
          brushLastX = mouseX;
          brushLastY = mouseY;
          ghostCtx.lineCap = 'butt';
       
      }

       function drawBallPen(str){
            if($("#slider-1").val()!=3) {
               setCanvasLineWidth(3);
              $("#slider-1").val(3);
              $('#slider-1').slider('refresh');
            } 
          
                    var unScore = str.split('_');
                    ctx.lineCap = 'round';
                       for(var i=0; i<unScore.length-1; i++){
                         var tmp = unScore[i].split('*'); 
                              var t1 = tmp[0].split(',');
                              var t2 = tmp[1].split(',');

                             var tmpX = t1[0];
                             var tmpY= t1[1];
                             var tmpA = t2[0];
                             var tmpB= t2[1];
                             ctx.beginPath();
                             ctx.moveTo(tmpX, tmpY);
                             ctx.lineTo( tmpA,tmpB);
                             ctx.stroke();
                         
                       }// for end
                    ctx.lineCap = 'butt';
          } // end drawFur


              function ghostEraser( mouseX, mouseY )
     {
     
      setCanvasColor('rgb(255,255,255)');

      ghostCtx.beginPath();
      ghostCtx.lineCap = 'round';
        ghostCtx.moveTo(brushLastX,brushLastY);
        ghostCtx.lineTo( mouseX, mouseY);
        ghostCtx.stroke();
        brushStroke =brushStroke+brushLastX+','+brushLastY+'*'+mouseX+','+mouseY+'_';
          brushLastX = mouseX;
          brushLastY = mouseY;
          ghostCtx.lineCap = 'butt';
       
      setCanvasColor($('#colNow').css('background-color'));
      }

       function drawEraser(str){
          
          setCanvasColor('rgb(255,255,255)');
        
                    var unScore = str.split('_');
                    ctx.lineCap = 'round';
                       for(var i=0; i<unScore.length-1; i++){
                         var tmp = unScore[i].split('*'); 
                              var t1 = tmp[0].split(',');
                              var t2 = tmp[1].split(',');

                             var tmpX = t1[0];
                             var tmpY= t1[1];
                             var tmpA = t2[0];
                             var tmpB= t2[1];
                             ctx.beginPath();
                             ctx.moveTo(tmpX, tmpY);
                             ctx.lineTo( tmpA,tmpB);
                             ctx.stroke();
                         
                       }// for end
                    ctx.lineCap = 'butt';
                     
                     setCanvasColor($('#colNow').css('background-color'));
          } // end drawFur