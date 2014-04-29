

      function ghostRct(a,b){

			ghostCtx.clearRect(0, 0, canvas.width, canvas.height);

	    	  //rect(x, y, w, h)
    	   
			ghostCtx.strokeRect(startX,startY,(a-startX),(b-startY));
          }

          function drawRct(x,y,a,b){
          //rect(x, y, w, h)
          
          ctx.strokeRect(x,y,(a-x),(b-y));
          }


          function ghostFillRct(a,b){

      ghostCtx.clearRect(0, 0, canvas.width, canvas.height);

          //rect(x, y, w, h)
        
      ghostCtx.fillRect(startX,startY,(a-startX),(b-startY));
          }

          function drawFillRct(x,y,a,b){
          //rect(x, y, w, h)
         
          ctx.fillRect(x,y,(a-x),(b-y));
          }

      function ghostCirc(a,b){
    	  // circle arc(x, y, radius, startAngle, endAngle, anticlockwise);  
    	 	ghostCtx.clearRect(0, 0, canvas.width, canvas.height);
    	 	 ghostCtx.beginPath();  //
    	 	 var radius = (a-startX)/2;
    	 	 if(radius<0)
    	 	 { radius=0; }
    	    ghostCtx.arc(startX+radius,startY+radius,radius, 0, Math.PI*2, false);  
    	    ghostCtx.closePath();  
    	    ghostCtx.stroke();

          }

          function drawCirc(x,y,a,b){
        // circle arc(x, y, radius, startAngle, endAngle, anticlockwise);  
         ctx.beginPath();  //
         var radius = (a-x)/2;
         if(radius<0)
         { radius=0; }
          ctx.arc(x+radius,y+radius,radius, 0, Math.PI*2, false);  
          ctx.closePath();  
          ctx.stroke();
          }

       function ghostFillCirc(a,b){
        // circle arc(x, y, radius, startAngle, endAngle, anticlockwise);  
        ghostCtx.clearRect(0, 0, canvas.width, canvas.height);
         ghostCtx.beginPath();  //
         var radius = (a-startX)/2;
         if(radius<0)
         { radius=0; }
          ghostCtx.arc(startX+radius,startY+radius,radius, 0, Math.PI*2, false);  
          ghostCtx.closePath();  
          ghostCtx.fill();

          }

          function drawFillCirc(x,y,a,b){
        // circle arc(x, y, radius, startAngle, endAngle, anticlockwise);  
         ctx.beginPath();  //
         var radius = (a-x)/2;
         if(radius<0)
         { radius=0; }
          ctx.arc(x+radius,y+radius,radius, 0, Math.PI*2, false);  
          ctx.closePath();  
          ctx.fill();
          }



      	function ghostLine(a,b){
      		  ghostCtx.clearRect(0, 0, canvas.width, canvas.height);
      		  ghostCtx.beginPath();  
      	    ghostCtx.moveTo(startX,startY);
      	  	ghostCtx.lineTo(a,b);
          	ghostCtx.closePath(); 
          	ghostCtx.stroke(); 
          	}

            function drawLine(x,y,a,b){
            ctx.beginPath();  
            ctx.moveTo(x,y);
            ctx.lineTo(a,b);
            ctx.closePath(); 
            ctx.stroke(); 
            }
