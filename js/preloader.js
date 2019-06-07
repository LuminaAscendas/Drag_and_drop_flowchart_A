var imgPreloadArray = new Array("images/loading.gif",
	                            "images/begin.png",
	                            "images/blank.png",
	                            "images/drag_1.png",
	                            "images/drag_2.png",
	                            "images/drag_3.png",
	                            "images/drag_4.png",
	                            "images/drag_5.png",
	                            "images/drag_6.png",
	                            "images/drag_7.png",
	                            "images/drag_8.png",
	                            "images/drag_9.png",
	                            "images/drag_10.png",
	                                                                             
	                            "images/drop_1.png",
	                            "images/drop_2.png",
	                            "images/drop_3.png",
	                            "images/drop_4.png",
	                            "images/drop_5.png",
	                            "images/drop_6.png",
	                            "images/drop_7.png",
	                            "images/drop_8.png",
	                            "images/drop_9.png",
	                            "images/drop_10.png",
	                                                     	                            
	                            "images/next.png",
	                            "images/prev.png",
	                            "images/close_btn.png");
var imagePreCount = 0;
for(var pId = 0; pId < imgPreloadArray.length; pId++)
{
	var img = new Image();
	img.onload = imagePreloaded;
	img.src = imgPreloadArray[pId];
}
function imagePreloaded()
{
	imagePreCount++;
}