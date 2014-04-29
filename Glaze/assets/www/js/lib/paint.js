 


 var startX=0; var startY=0;
 var ofsetTop=0; var ofsetLeft=0;

 var mDwn = false;
 var canvas;  var ctx ;
  var ghostCanvas;  var ghostCtx ; 
  var colorCanvas; var colorCtx;
  var canvasColor = new Array();

// Array History

var canvasHistory = new Array();
var currentShape = null;
var canvasLineWidth =1;
var canvasOpacity = 1;

//color swatch count
var swatch =1;

var brushSelected =false;
var brushStart = false;
var brushStroke = null;
var curBrushName=null;
var points = new Array();
var brushLastX =0; var brushLastY=0;
var count = 0;
var brushPRESSURE =1;


      $(document).ready(function(){

       
        $('#canvas').attr('width',$(window).width() );
        $('#canvas').attr('height', (parseInt($(window).height()))+"px");
        $('#ghostCanvas').attr('width',$(window).width() );
        $('#ghostCanvas').attr('height', (parseInt($(window).height()))+"px");
        


          
  

// setup Ghost Options
          ghostCanvas = document.getElementById("ghostCanvas");  
           ghostCtx = ghostCanvas.getContext("2d"); 
           
           
         
  // setup Actual Canvas Options         
    	   canvas = document.getElementById("canvas");  
           ctx = canvas.getContext("2d"); 
           
              
           setCanvasColor("rgb(255,255,255)");
          ctx.fillRect(0, 0,parseInt($(window).width()),parseInt($(window).height()));
           setCanvasColor("rgb(28,184,237)"); 
            setCanvasOpacity(1);
            setCanvasLineWidth(1);

           // set offset values
           var ofset = $('#canvas').offset();
           ofsetTop=ofset.top;
           ofsetLeft=ofset.left;
           $("#ghostCanvas").css('top','2px');
            $("#ghostCanvas").css('left',ofsetLeft);


            //Bind Touch Events
             ghostCanvas.addEventListener('touchstart', tStartFun, false);
             ghostCanvas.addEventListener('touchmove', tMoveFun, false);
             ghostCanvas.addEventListener('touchend', tEndFun, false);
          
          
// on load event for main page
$('#mainPage').bind('pageinit', function() {
          // 

          $.mobile.fixedToolbars.setTouchToggleEnabled(false);

            //salert('smaaaaalllllll ='+ht2.top);
            //alert($('#footrBAR').height());
           $('#canvas').attr('width',$(window).width() );
             
          $('#canvas').attr('height', (parseInt($(window).height())-66)+"px");
          $('#ghostCanvas').attr('width',$(window).width() );
          $('#ghostCanvas').attr('height',(parseInt($(window).height())-66)+"px");
          setCanvasColor("rgb(28,184,237)"); 
      //alert(1);
        });

        

        // Tool Selection Set on click
                $(".toolBtn").click(function(e){
                      $('.toolBtnActive').removeClass('toolBtnActive');
                      $(this).addClass('toolBtnActive');  
                      if($(this).attr('id')!=20) {
                     $.mobile.changePage($('#mainPage'));
                      }
                  });

        // Color Picker Init
                colorCanvas = document.getElementById('colorCanvas');
                colorCtx=colorCanvas.getContext('2d');
              var img = new Image();
              img.src = 'images/colorSphere1.png';
              img.onload = function(){
                colorCtx.drawImage(img,0,0);
                }

                 colorCanvas.addEventListener('touchmove', colorPickFun, false);
     
    
				  

        // switch Color between three
        $('.currColor').click(function(){
          $('.colorBtnActive').removeClass('colorBtnActive');
          $(this).addClass('colorBtnActive');
          setCanvasColor($(this).css('background-color'));
                });                  

                // add 10 tmp colors
                $('.addColorBtn').click(function(){
                  $('#tmpCol'+swatch).css('background-color', $('#tmpColor').css('background-color'));
                       swatch++;
                       if(swatch>10)
                       { swatch =1;}

                });

            // on any color button click    
            $('.colorBtn').click(function(){
                  $('.colorBtnActive').css('background-color', $(this).css('background-color'));
                  setCanvasColor($(this).css('background-color'));
                });


                // slider events
                $("#slider-0").change(function(event, ui) {
               $('#opacityBox').val($(this).val());
               setCanvasOpacity(parseInt($(this).val())/10);
                 });

                $("#slider-1").change(function(event, ui) {
                        $('#thicknessBox').val($(this).val()); 
                        setCanvasLineWidth($(this).val());
                          });
               


      }); // Doc on load End


// Draw Function start


// touch events
// touch Start event
 function tStartFun(event){
   $.each(event.touches, function(i, touch) {
             mDwn =true;
             startX=this.pageX-ofsetLeft;
             startY=this.pageY-ofsetTop;
         
       
        });
         event.preventDefault();
     }
   

   // Set false on Mouse up and Draw Really on Canvas
          function tEndFun(event){
               mDwn=false;
               count=0; points = new Array();
               brushStart = false;
                       if(brushSelected==false)
                      {
                        canvasHistory.push(currentShape);
                          eval(currentShape); 
                      }else{
                        //alert(brushStroke);
                        var tmpStroke = curBrushName +'(\"'+brushStroke+'\")';
                        canvasHistory.push(tmpStroke);
                        eval(tmpStroke); 
                          brushStroke ='';
                      }
           }

   // Set true on Mouse Down and Sketch on Ghost
      function tMoveFun(event){
            var e = event;
           $.each(event.touches, function(i, touch) {
              var e = this;
              var toolID = parseInt($('.toolBtnActive').attr('id'));
              switch(toolID){
                            case 1:{
                             brushSelected=false;
                              ghostCirc(this.pageX-ofsetLeft,this.pageY-ofsetTop);
                               currentShape ='drawCirc('+(startX)+','+(startY)+','+(this.pageX-ofsetLeft)+','+(this.pageY-ofsetTop)+')'; $('#currentS').val(currentShape);
                                break;  
                              }
                            case 2:{ brushSelected=false;
                                  ghostRct(this.pageX-ofsetLeft,this.pageY-ofsetTop);
                                   currentShape ='drawRct('+(startX)+','+(startY)+','+(this.pageX-ofsetLeft)+','+(this.pageY-ofsetTop)+')'; $('#currentS').val(currentShape);
                                 break;   
                                }
                            case 3:{ brushSelected=false;
                              ghostLine(this.pageX-ofsetLeft,this.pageY-ofsetTop);
                              currentShape ='drawLine('+(startX)+','+(startY)+','+(this.pageX-ofsetLeft)+','+(this.pageY-ofsetTop)+')'; $('#currentS').val(currentShape);
                                break; 
                              } 
                               case 5:{ brushSelected=false;
                              ghostFillCirc(this.pageX-ofsetLeft,this.pageY-ofsetTop);
                              currentShape ='drawFillCirc('+(startX)+','+(startY)+','+(this.pageX-ofsetLeft)+','+(this.pageY-ofsetTop)+')'; $('#currentS').val(currentShape);
                                break; 
                              } 
                            case 6:{ brushSelected=false;
                              ghostFillRct(this.pageX-ofsetLeft,this.pageY-ofsetTop);
                              currentShape ='drawFillRct('+(startX)+','+(startY)+','+(this.pageX-ofsetLeft)+','+(this.pageY-ofsetTop)+')'; $('#currentS').val(currentShape);
                                break; 
                              }  
                              case 20:{
                                 brushSelected=true;
                                if(brushStart == false){
                                curBrushName='drawEraser';
                                  brushStart= true;
                                  brushLastX=this.pageX-ofsetLeft;
                                  brushLastY=this.pageY-ofsetTop;
                                    }
                              ghostEraser(this.pageX-ofsetLeft,this.pageY-ofsetTop);
                                break; 
                              } 
                              case 21:{
                                 brushSelected=true;
                                if(brushStart == false){
                                curBrushName='drawShaded';
                                  brushStart= true;
                                  brushLastX=this.pageX-ofsetLeft;
                                  brushLastY=this.pageY-ofsetTop;
                                    }
                              ghostShaded(this.pageX-ofsetLeft,this.pageY-ofsetTop);
                                break; 
                              } 
                              case 22:{
                                 brushSelected=true;
                                if(brushStart == false){
                                  curBrushName='drawFur';
                                  brushStart= true;
                                  brushLastX=this.pageX-ofsetLeft;
                                  brushLastY=e.pageY-ofsetTop;
                                    }
                                  ghostFur(this.pageX-ofsetLeft,this.pageY-ofsetTop);
                                    break; 
                              } 
                              case 23:{
                                 brushSelected=true;
                                if(brushStart == false){
                                  curBrushName='drawPencil';
                                  brushStart= true;
                                  brushLastX=this.pageX-ofsetLeft;
                                  brushLastY=this.pageY-ofsetTop;
                                    }
                                  ghostPencil(this.pageX-ofsetLeft,this.pageY-ofsetTop);
                                  break; 
                              } 
                              case 24:{
                                 brushSelected=true;
                                if(brushStart == false){
                                  curBrushName='drawBallPen';
                                  brushStart= true;
                                  brushLastX=this.pageX-ofsetLeft;
                                  brushLastY=this.pageY-ofsetTop;
                                    }
                                  ghostBallPen(this.pageX-ofsetLeft,this.pageY-ofsetTop);
                                  break; 
                              } 
                   }//switch
        
                });// if mouse is down // all moves
         
          event.preventDefault();
        }

// Core Canvas Functions
  
    function setCanvasColor(rgb){
      //alert(rgb);
      ctx.fillStyle = rgb;
      ctx.strokeStyle = rgb; 
      ghostCtx.strokeStyle = rgb;   
      ghostCtx.fillStyle = rgb; 

      rgb=rgb.replace('rgb(','');  rgb=rgb.replace(')','');
      var t = rgb.split(',');
      canvasColor.push([ t[0],t[1],t[2]]) ;
    }


    function setCanvasOpacity(opc){
      ctx.globalAlpha =opc;
       ghostCtx.globalAlpha =opc;
       canvasOpacity=opc;
       canvasHistory.push('setCanvasOpacity('+opc+')');
    }

    function setCanvasLineWidth(wid){
      ctx.lineWidth =wid;
       ghostCtx.lineWidth =wid;
       canvasLineWidth =wid;
       canvasHistory.push('setCanvasLineWidth('+wid+')');
    }

      function imgO(){

    	  window.location = canvas.toDataURL('image/png');
          }


         
function saveImage(){
  
  $.mobile.changePage($('#mainPage'));
  var t=setTimeout("saveimgers()",1500);
//glazeInterface.saveFile

}
function saveimgers(){
  glazeInterface.saveFile($('#fileNameStr').val(),$('#fileFormat').val(),parseInt($('#footrBAR').height()) -5);

}

function fileSaved(str){
  $('#savedFileName').val(str);
  $('#savedImage').dialog('open');
  var t=setTimeout("closeSvdImage()')",2000);
  $('#savedImage').dialog('close');
  
}

function closeSvdImage(){
   $('#savedImage').dialog('close');
  $.mobile.changePage($('#mainPage'));
}

function newCanvas(){
  setCanvasColor("rgb(255,255,255)");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
drawFillRct(0,0,canvas.width,canvas.height);
ghostCtx.clearRect(0, 0, canvas.width, canvas.height);
setCanvasColor($('#colNow').css('background-color'));
$.mobile.changePage($('#mainPage'));
}

function debug(){
  
        $('#canvas').attr('width',$(window).width() );
        $('#canvas').attr('height',$(window).height() - $('#footrBAR').height() -5);
        $('#ghostCanvas').attr('width',$(window).width() );
        $('#ghostCanvas').attr('height',$(window).height() - $('#footrBAR').height()- 5);
        $.mobile.changePage($('#mainPage'));
}

function colorPickFun(event){
  
 $.each(event.touches, function(i, touch) {
                          var tmpOf = $('#colorCanvas').offset(); 
                           var minX = tmpOf.left;
                            var minY = tmpOf.top ;
                            var maxX = tmpOf.left+150;
                            var maxY = tmpOf.left+150;
                          // alert(minX+'   '+maxX);
                          var x = parseInt(this.pageX )- parseInt(tmpOf.left)
                          var y = parseInt(this.pageY )- parseInt(tmpOf.top);
                         
                          var imgd = colorCtx.getImageData(x, y, 1, 1);
                          var data = imgd.data;
                          var out = $('#colNow');
                          var hexString = rgbToHex(data[0]+','+data[1]+','+data[2]);
                          //alert("color is " + data[0]+','+data[1]+','+data[2]);
                          out.attr("style","background-color: rgb("+data[0]+","+data[1]+","+data[2]+");");
                                          setCanvasColor("rgb("+data[0]+","+data[1]+","+data[2]+")");


                          });
                   event.preventDefault(); 


}

          	function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function rgbToHex(rgb) {
  var r; var g;var b;
    rgb =""+rgb;
   rgb = rgb.replace("rgb(",""); 
   rgb = rgb.replace(")","");
   //alert(rgb);
   var rgbSet= rgb.split(',');
   r = parseInt(rgbSet[0]);g = parseInt(rgbSet[1]);b = parseInt(rgbSet[2]);
   //alert(r+' '+g+' '+b);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}



