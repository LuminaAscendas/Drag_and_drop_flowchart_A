
var cont = document.getElementById('responsive_container');

var	cont_1 = document.getElementById('midDivBegin');
var cont_2 = document.getElementById('mainContainer');
var isWebkit = 'webkitRequestAnimationFrame' in window;
var scale = 1;

function resizeApp(){
	if(!begin_entered){
		 var winWidth = $("#begin_page").width();
		var winHeight = $("#begin_page").height();
		var appWidth = cont_1.offsetWidth;
		var appHeight = cont_1.offsetHeight;	
		winWidth = window.innerWidth-100; //retrieve current window width
		winHeight = window.innerHeight;
		if(winWidth-60 < appWidth || winHeight-60 < appHeight)
        {
			if(winWidth >200) scale = (((winWidth/appWidth)<(winHeight/appHeight))?(winWidth/appWidth):(winHeight/appHeight))-0.01//-0.15; //scaling
			
        }
            else {
                
                scale=1;
            }
			if(scale<0.410915){
				scale=0.410915;
			}
			cont_1.style.msTransformOrigin = '0 0';	
			cont_1.style.msTransform = "scale("+scale+","+scale+")";
			cont_1.style.TransformOrigin = '0 0';	
			cont_1.style.Transform = "scale("+scale+")";
			cont_1.style.webkitTransformOrigin = '0 0';
			cont_1.style.webkitTransform = "scale("+scale+")";
			cont_1.style.MozTransformOrigin = '0 0';	
			cont_1.style.MozTransform = "scale("+scale+")";
			$('body').css('height',(bodyheight)+'px');
			$('body').css('background-size','100% '+(bodyheight)+'px');
			//$('#main_container').css('height',($("#begin_page").height()*scale)+$("#text_container").height());
			$('#mainContainer').css('width',$("#responsive_container").width()*scale);
		
	}else if(!next_page){
		cont_2 = document.getElementById('responsive_container');
		var winWidth = $("#mainContainer").width();
		var winHeight = $("#mainContainer").height();
		var appWidth = cont_2.offsetWidth;
		var appHeight = cont_2.offsetHeight;	
		winWidth = window.innerWidth-100; //retrieve current window width
		winHeight = window.innerHeight; //retrieve current window height
	  	if(winWidth-60 < appWidth || winHeight-60 < appHeight)
        { 
			if(winWidth >200)scale = (((winWidth/appWidth)<(winHeight/appHeight))?(winWidth/appWidth):(winHeight/appHeight))-0.01//-0.15; //scaling
	   
        }
		else {
			
			scale=1;
		}
			if(scale<0.410915){
				scale=0.410915;
			}
			cont_2.style.msTransformOrigin = '0 0';	
			cont_2.style.msTransform = "scale("+scale+","+scale+")";
			cont_2.style.TransformOrigin = '0 0';	
			cont_2.style.Transform = "scale("+scale+")";
			cont_2.style.webkitTransformOrigin = '0 0';
			cont_2.style.webkitTransform = "scale("+scale+")";
			cont_2.style.MozTransformOrigin = '0 0';	
			cont_2.style.MozTransform = "scale("+scale+")";
			var appWidth = cont_2.offsetWidth * scale;
			var bodyheight = cont_2.offsetHeight*scale;
			var bodywidth = cont_2.offsetWidth*scale;
			var winWidth = window.innerWidth;
			$('body').css('height',(bodyheight)+'px');
			$('body').css('background-size','100% '+(bodyheight)+'px');
			//document.getElementById('main_container').style.left = ((winWidth - appWidth )/2)+'px';
			//$('#main_container').css('height',($("#responsive_container").height()*scale)+$("#text_container").height());
			$('#mainContainer').css('width',$("#responsive_container").width()*scale);
			
		
	}else
	{
		cont = document.getElementById('responsive_container1');
		var winWidth = $("#mainContainer").width();
		var winHeight = $("#mainContainer").height();
		var appWidth = cont.offsetWidth;
		var appHeight = cont.offsetHeight-100;
		winWidth = window.innerWidth; //retrieve current window width
		winHeight = window.innerHeight; //retrieve current window height
		console.log(winWidth-100 , appWidth , winHeight,appHeight)
		if(winWidth-100 < appWidth || winHeight-100 < appHeight)
		{
		   scale = (((winWidth/appWidth)<(winHeight/appHeight))?(winWidth/appWidth):(winHeight/appHeight))-0.07//-0.15; //scaling
		}
		else {
			scale=1;
		}
		
		if(scale<0.410915){
			scale=0.410915;
		}
			cont.style.msTransformOrigin = '0 0';	
			cont.style.msTransform = "scale("+scale+","+scale+")";
			cont.style.TransformOrigin = '0 0';	
			cont.style.Transform = "scale("+scale+")";
			cont.style.webkitTransformOrigin = '0 0';
			cont.style.webkitTransform = "scale("+scale+")";
			cont.style.MozTransformOrigin = '0 0';	
			cont.style.MozTransform = "scale("+scale+")";
			var appWidth = cont.offsetWidth * scale;
			var bodyheight = cont.offsetHeight*scale;
			var bodywidth = cont.offsetWidth*scale;
			var winWidth = window.innerWidth;
			$('body').css('height',(bodyheight)+'px');
			$('body').css('background-size','100% '+(bodyheight)+'px');
			//cont.style.left = ((winWidth - appWidth )/2)+'px';
			$('#mainContainer').css('width',$("#responsive_container").width()*scale);
			var con_bodywidth=bodywidth+50;
			var con_bodyheight=bodyheight+10;
			
			console.log('con_bodywidth',con_bodywidth)
			if(con_bodywidth>750)con_bodywidth=750;
			if(con_bodyheight>680)con_bodyheight=680;
			 $('.contain1').css('width',(con_bodywidth)+'px');
			$('.contain1').css('height',(con_bodyheight)+'px');
		
	}
}


	

resizeApp();


	
window.onresize = function() {
    resizeApp();
}	
resizeApp();
  
	
	
	
		
	



