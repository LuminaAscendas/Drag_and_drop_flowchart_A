var begin_entered=false;
var next_page=true;
var popup=false;
/* (function(Player) { */
    var aSlidesArray = new Array();
    var nSlideCounter=0;
    var nCount=0;
    var optionsDrag;
    var optionsDrop;
    var DragID;
    var DropID;
    var acceptance = false;
    var dropHover = false;
    var AnsDropped = new Array();
    var CorrectOptionArray=new Array();
    var DragSet = "";
    var DropSet = "";    
    var Count = 0;
    var OptionArray=new Array();
    var repeatedOption = new Array();
    var tempRepeteddVal = '';
    var tempParentDragId = '';
   var tempParent=''
	
	
	
    $(document).ready(function() {
        $(window).load(function() {
           $(".loader").delay(800).fadeOut("slow");
           $('.loadDiv').delay(800).fadeOut(300);
        });
        
        init();
         $("#pageContainer").hide();
         $(".nextPage").hide();
        set_tabindex();  
        $(document).bind("keydown mousedown",enable_scorm);
        $("#naviLeft").bind("click keyup",fnBack);
        $("#naviRight").bind("click keyup",fnNext);
        $(".close-btn").bind("click",popUpClose);
        $(".hideCompleteScheme").bind("click",fnhideScheme);
        startActivity(); 
          $('.mainContainer').css('height','680px');
          $(".beginBtn").bind("click",fnBegin);
          $(".nextBtn").bind("click",fnnextBtn);      
		
        
		$('#begin_focus').on('focus',function(){
			$('.tabindex').eq(1).focus();	
		})
		$('#begin_end_focus').on('focus',function(){
			
			$('.tabindex').eq(1).focus();
		})
		$('#next_focus').on('focus',function(){
			$('.tabindex').eq(1).focus();	
		})
		$('#next_end_focus').on('focus',function(){
			
			$('.tabindex').eq(1).focus();
		})
		$('#activity_focus').on('focus',function(){
			$('.tabindex').eq(1).focus();	
		})
		$('#activity_end_focus').on('focus',function(){
			$('.tabindex').eq(1).focus();
		})
		$('.directionTextStart').on('focusout',function(){
			//$('#mainContainer').removeAttr('role');
		})
		$('#popup_focus').on('focus',function(){
			$('.tabindex').eq(1).focus();	
		})
		$('#popup_end_focus').on('focus',function(){
			$('.tabindex').eq(1).focus();
		})
		
		document.body.onkeyup = function(e){
			
			
			if(e.keyCode == 32 || e.keyCode == 13){
				
				console.log(e.target.id);
				
				e.preventDefault(e);
				if(e.target.id!='label_head_1'||e.target.id!='label_head_2'||e.target.id!='label_head_3'){
					$('#'+e.target.id).trigger('click');
					$('#'+e.target.id).focus();
				}
				
			}
			
		}
		
		 if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
			$('.directionTextStart,.titleText,.activityQuestion').attr('role','text');
		}else {$('.titleText').attr('role','none');} 
		$(".biganImg").mouseenter(function(){
			if(!begin_entered) $(".biganImg ").attr("title","Flow Chart");
			else $(".biganImg ").attr("title","Flow Chart");
		});
		$(".biganImg").mouseleave(function() {
			$(".biganImg").removeAttr('title');
		});
   });

    function shuffle(array) {
      var currentIndex = array.length,
          temporaryValue, randomIndex;
      while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
      return array;
    }

    function fnBegin(){
		$('a').attr('href','#next_btn');
	console.log("ssdfdsf'")
		begin_entered=true;
		next_page=false;
		$("#pageContainer").hide();
		//setTimeout(function(){
			$(".nextPage").fadeIn(500);
		//},1000)
        
        $(".beginPage").hide();
        $('.mainContainer').css('height','680px');
        //$('.titleText').css('top','97px').css('left','61px');
        set_tabindex();
		if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
			$('#mainContainer').attr('role','application');
			//$('#mainContainer').removeAttr('role');
		}else{
			$('#mainContainer').attr('role','application');
		}
		
		resizeApp();
		
		
    }

    function fnnextBtn(){
		$('a').attr('href','#feedbacks_view_graphic');
		next_page=true;
		//setTimeout(function(){
			$("#pageContainer").fadeIn(500);
		//},1000)
		
        $(".nextPage").hide();
        $("#begin_page").hide();
		
		// Here to add tab code
		$(".dropspot").attr('data-val','false');	
		$(".dropspot").unbind().bind('keydown', handleDragByKey);
		
        $('.mainContainer').css('height','862px');
       // $('.titleText').css('top','86px').css('left','49px');
	   
	   
        set_tabindex();
		resizeApp();
    }

    function init() {
       // $('.reset').off('keyup')
        acceptance = false;
        dropHover = false;
        AnsDropped = new Array();
        DragSet = "";
        DropSet = "";
        Count = 0;
      
        //$("title").append(data[0].headTitle);
		    $(".biganImg").attr("src", data[0].biganImg);
        $(".containerTitle").append(data[0].bodyTitle);
        $(".questionText").append(data[0].question);
        $(".direction").append(data[0].direction);
        $(".directionText").append(data[0].directionTextBegin);
        $(".footNote").append(data[0].foootNote);
        $(".popup > p").append(data[0].popupShow);
        $(".popup > p").attr('aria-label', data[0].popupShow);

        CorrectOptionArray = data[0].CorrectOptionArray;
        OptionArray = data[0].OptionArray;
        repeatedOption = data[0].repeatedOption;

        // console.log('CorrectOptionArray : ',repeatedOption);
        
        OptionArray=shuffle(OptionArray); // Shuufle Arrray
        OptionArray=shuffle(dropBoxName); // Shuufle Arrray

         // -----------------Set DropAble Area---------//  
         for (var i = 0; i < CorrectOptionArray.length; i++) {

            // for(var j=0; j< repeatedOption.length;j++){
                // tempRepeteddVal 
                if(CorrectOptionArray[i] != ''){
                  tempRepeteddVal = CorrectOptionArray[i];
                }else{
                  tempRepeteddVal=i;
                }
                
              DropSet += '<div id="dropSpot_' + i + '" class="droparea dropactive dropspot" data-repeated-id="'+tempRepeteddVal+'" aria-label="'+dropLabelText[0]+'" role="none"><div class="activtedAnswers"></div></div>';
          // }
        }
      
        var j=0;
        var firstFrameDragElement=3;
         DragSet += '<div class="frame headerFrame'+j+'">'; 

           for (var i = 0; i < dropBoxName.length; i++) { 
            
            //console.log('j : ',j);
            //console.log('OptionArray : ',OptionArray.length);

                  DragSet += '<div id="dragSpot_' + i + '_td" class="dragSpotWrapper" role="none" aria-label="'+dropBoxName[i].ariLa+'"><div id="dragSpot_' + dropBoxName[i].Text_id + '" class="dragbox normal box dragSpot" value="' + dropBoxName[i].Text_id + '">'+'<span class="textImg dragImg">'+dropBoxName[i].Text_name+'</span>'+'</div></div>';
       
        console.log('i =========== : ',i);
       
            if((i+1) % 9 == 0)
                  {
                    if((i+1)!= 9)
                    {
                    DragSet += '</div>';
                    j++;
                    DragSet += '<div class="frame headerFrame'+j+'">'; 
                  }
                  }
				//$('.dragSpotWrapper').eq(i).attr('aria-label',data[0].ariaLabel[OptionArray[index+1]]);  
           }
            DragSet += '</div>';
        $(".draggable").html(DragSet);
		setTimeout(function(){
		
			$('.dragbox').each(function(index){
			
				//console.log(OptionArray[index],OptionArray[index]-1,data[0].ariaLabel[OptionArray[index]-1])
					$('.dragSpotWrapper').eq(index).attr('aria-label',data[0].ariaLabel[OptionArray[index]-1]);
			});
			if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
				$('.dragSpotWrapper').removeAttr('role');
			}
		},100)
		
        $(".droppables tbody").append(DropSet);
        $(".dragbase").append(DragSet);
        $(".droppables").append(DropSet);

        //----------------- Draggable--------------------//
        optionsDrag = {
            tolerance: "touch",
            revert: function(event, ui) {
                if (acceptance == true && dropHover == true) {
                    return false;  
                } else {
                    return true;
                }      
            },
            // revertDuration: 10000,
            snapMode: 'outer',
            // opacity: 0.8,
            start: function(event, ui) {      
                dropHover = false;
                DragID = $(this).attr("id");
				
				
                tempParent=$('#'+DragID).parent()
                
				//console.log('DragID', DragID, 'tempParent', tempParent);
				// tempParent=$(abc).attr('id')
             
             },
            appendTo: $('.quizeSection'), 
            containment: $(".contain1"),
            drag: function(event, ui) {
				ui.position.left = ui.position.left / scale;
				ui.position.top = ui.position.top / scale;
            },
           
            stop: function(event, ui) {

            if($(this).parent().hasClass('dropspot'))
                 {
                   $(this).addClass('dragSuccess');// Drag Success
                 }

             else
                { 
                  $(this).css({"left": "0px","top": "0px"});//Drag Revert Back 
                  // $(".dragbox").hover(
                  //     function() {
                  //       $( this ).css('border','1px solid #007098');
                  //     },
                  //     function() {
                  //       $( this ).css('border','');
                  //     });
                 }
               

            }
        }; // Close Draggable


        $(".dragbox").draggable(optionsDrag);
        $(".dragbox").hover(
                      function() {
                        $( this ).css('border','1px solid #007098');
                      },
                      function() {
                        $( this ).css('border','');
                      });

        //-------------- Droppable ----------------//
        optionsDrop = {
            tolerance: "pointer",
            accept: function(a) {

                if ($(this).html() == "") {
                    acceptance = true
                    return true;
                }
                  acceptance = false;
                  return false;

             },
            drop: function(event, ui) {
              $(this).css("border", "none")
                 var dragValue=$('#'+DragID).attr('value'); // Drag value
              
                 var data_repeated_id=$(this).attr('data-repeated-id');

               $(this).css("border", "none");
                  var  data_repeated_arr = data_repeated_id.split(',');

				  console.log("htoihwTEOPI ", data_repeated_arr, dragValue);
				  
				  
                  for(var i=0 ; i< data_repeated_arr.length;i++){
                      if(dragValue==data_repeated_arr[i])
						   { 
							
                          $('.reset').removeClass('resetdesable');

                             // tempParent=$('#'+DragID).parent()
                             $(this).append($("#" + DragID));
                            
                             $(this).removeClass('dropactive');
                             $("#" + DragID).addClass('dropFilled')
                              var numId = DragID.match(/\d+/);
                              $('#'+DragID+' > span').css('background-image','url("images/drop_'+numId+'.png")');
                             // $('#'+DragID+' > span').css('width','242px');
							  $('#'+DragID+' > span').html('');
                             
                              autoUpdatedDragBox(); 
                          }
                  }
					console.log('DragID', DragID);
                AnsDropped[Number(DragID.replace("dragSpot_", ""))] = DragID;

                  $('#'+DropID).removeProp('background');
                  $(".reset").css("pointer-events", "")
                 // count++;
                  
                if (CorrectOptionArray.length == $('.droppables .dragbox').length) {
                      // $('.reset').removeClass('resetdesable');
                      $('.popupContainer').show();
					  popup=true;
					  set_tabindex();	
                 }
              if(!$('.draggable .dragSpotWrapper .dragSpot').length){
                    DisableLeftArrow();
                    DisableRightArrow();
                }
            },
            over: function(event, ui) {
                dropHover = true;
                $(this).css("border", "2px solid #007098");

            },
            out: function(event, ui) {
                dropHover = false;
                $(this).css("border", "none");
            }
        };
        // console.log('optionsDrop : '+optionsDrop);
        $(".dropspot").droppable(optionsDrop);
         $(".reset").off().on("click", function(ev) {
			if(($(".reset").hasClass('resetdesable')))
			{
				return false;
			}
            if(ev.type=="click"){
                ResetFun();
                set_tabindex();
              }
            if(!($(".reset").hasClass('resetdesable')) && ev.keyCode==13){
                  ResetFun();
                  set_tabindex(); 
               }
        });
        $(".feedbacks > div").hide();
        $('.droppables').css('display','block');
        // $('.quizeSection').css('background-image','url(images/bg_blank_drops_updated.png)');
        $(".viewCompleteScheme").show();
        // $(".begin").show();
        $(".viewCompleteScheme ").on("click", function(ev) {
           /* if(ev.type=="keyup" && ev.keyCode !=13){    
                 return  true; 
            } */
        $('.reset').hide(); 
        $('.hideCompleteScheme').show();
        $(this).hide();
        $('.droppables').css('display','none');
        $('.quizeSection').addClass('answerImage');
        $('.footer').addClass('hide');
        $('.footNote').removeClass('hide');
        $('.mainContainer').css('height','680px');
        $('.feedbacks').css('top','-142px');
        });
     /*----------------header navigation--------*/
        $(".draggable .frame").each(function() {
            $(this).css('display', 'none')
            aSlidesArray.push($(this))
            nCount++;
        });
        $(".draggable .headerFrame0").show();
        fnCheckNextBack();
        set_tabindex();
		resizeApp();
}// close init
        function startActivity()
         {
       // On click Begin button
        // $(".begin").off().on("click keyup", function(ev) {
       
        
        //     if(ev.type=="keyup" && ev.keyCode !=13){    
        //          return  true; 
        //     }

            animEffectToAll()
            set_tabindex();

            $(".reset").show()// show Reset button when enter or click on begin
            $('.reset').addClass('resetdesable');
            // $('.viewCompleteScheme').hide(); 
            $(".footer").removeClass('hide');
            $('.footNote').addClass('hide');
            $('.quizeSection').removeClass('answerImage');
            $('.droppables').css('display','block');
           
                
            // $(".begin").hide(); 
            $(".droppables > div").empty();
            $(".droparea").each(function(index) 
              {
                $("#dropSpot_" + index).removeClass('active').addClass('dropactive');
                // $("#dropSpot_" + index).css('background','none');
              });
   
        // });
		
}
    function ResetFun() {
        
        $('.footer').addClass('hide');
        $('.footNote').addClass('hide');
        $(".droppables").empty();
        // $('.reset').off('keyup'); 
     
        // $('.begin').css('display','none'); 
        
        $("title").empty();
         nSlideCounter=0;
          nCount=0;
          aSlidesArray = new Array();
        $(".containerTitle").empty();
        $(".questionText").empty();
        $(".direction").empty();
        $(".directionText").empty();
        $(".draggable").empty();
        $(".droppables").empty();
        $(".footNote").empty();
        $(".popup > p").empty();
        $(".dragbase").empty().hide();
        $('.dropspot').removeClass('inactiveDisabled');
        // $('#naviRight').css('opacity','1'); 
        init();
         

            animEffectToAll()
            set_tabindex();

            $(".reset").show()// show Reset button when enter or click on begin
            $('.reset').addClass('resetdesable');
            // $('.viewCompleteScheme').hide(); 
            $(".footer").removeClass('hide');
            $('.footNote').addClass('hide');
            $('.quizeSection').removeClass('answerImage')
            $('.droppables').css('display','block');
                
            // $(".begin").hide(); 
            $(".droppables > div").empty();
            $(".droparea").each(function(index){
                $("#dropSpot_" + index).removeClass('active').addClass('dropactive');
                // $("#dropSpot_" + index).css('background','none');
            });
			// here to add tab index click function
			$(".dropspot").attr('data-val','false');	
			$(".dropspot").unbind().bind('keydown', handleDragByKey);			

			
    }

function animEffectToAll()
    {      
          
            // $('.begin').hide();
            $('.activityQuestion').hide();
            $('.activityQuestion').fadeIn('slow');

            $('.summaryText').hide();
            $('.summaryText').fadeIn('slow');

            $('.contain').hide();
            $('.contain').fadeIn('slow');

    }
     function enable_scorm(event){
      $(this).addClass("ontab");
      if(event.type=="mousedown"){

          $(".tabindex").blur();
          $(".tabindex").removeClass("ontab");
      }
      if(event.keyCode==9){
          $(".tabindex").addClass("ontab");
      }
    }

    
   
    function autoUpdatedDragBox() {

             lastFrame = $('.draggable > div').last();
             lastFrameDragSpot = $(lastFrame).children().first();

			 //console.log('lastFrameDragSpot', lastFrameDragSpot);
			 
			 
             currentFrame = $(tempParent).parent();
             //console.log('currentFrame>>>>>',currentFrame)
             $(tempParent).remove();

             if (!(($(lastFrame).attr('class')) == ($(currentFrame).attr('class')))) {
                 $(currentFrame).append(lastFrameDragSpot);

             }

             if ($(lastFrame).is(':empty')) {
                   nCount = 0;
                   $(lastFrame).remove();
                   aSlidesArray = new Array()

                   $(".draggable .frame").each(function() {
                       aSlidesArray.push($(this))
                       nCount++;
                   });
             }

             if ($(currentFrame).is(':empty')) {
                backSlide();
                 // fnBack();
                $('#naviRight').addClass('rightArrowDisable');

             }

             lastFrame = $('.draggable > div').last();


            if (($(lastFrame).attr('class')) == ($(currentFrame).attr('class'))) {
             $('#naviRight').addClass('rightArrowDisable');
			}  

}

function fnCheckNextBack() {
        if (nSlideCounter == 0) {
            DisableLeftArrow();
            EnableRightArrow();        
        }else if (nSlideCounter == aSlidesArray.length-1) {
            EnableLeftArrow();
            DisableRightArrow();
        }else{
            EnableLeftArrow();
            EnableRightArrow();
        }        
    }
/*      Player.returnPageArray = function() {
        return aSlidesArray;
    } */

    function fnBack(ev){
      if(ev.type=="keyup" && ev.keyCode !=13){    
                 return  true; 
            }
            backSlide();
      }
   function backSlide(){
        if(nSlideCounter>0){
             nSlideCounter--;
             $(".frame").hide();
             $(".headerFrame"+nSlideCounter).show();
        }else{
            DisableLeftArrow();
        }
       fnCheckNextBack();
   }
    function fnNext(ev){
       if(ev.type=="keyup" && ev.keyCode !=13){    
                 return  true; 
            }
      console.log(nSlideCounter)
      console.log(nCount-1)
        if(nSlideCounter<(nCount-1)){
            console.log("Enable");
            nSlideCounter++;
            EnableRightArrow();
            //console.log("Right>>"+nSlideCounter);
            $(".frame").hide();
             $(".headerFrame"+nSlideCounter).show();
        }else{
          // $('#naviRight').css('opacity','0.32');
            DisableRightArrow();   
            console.log("Disable");

        }
        fnCheckNextBack()
    }
    function EnableLeftArrow(){
        $("#naviLeft").removeClass("leftArrowDisable").addClass("leftArrowEnable").css({"pointer-events":"auto", "cursor":"pointer"});
    }
    function DisableLeftArrow(){
        $("#naviLeft").removeClass("leftArrowEnable").addClass("leftArrowDisable").css({"pointer-events":"none", "cursor":"default"});
    }
     function EnableRightArrow(){
        $("#naviRight").removeClass("rightArrowDisable").addClass("rightArrowEnable").css({"pointer-events":"auto", "cursor":"pointer"});
    }
    function DisableRightArrow(){
      console.log('hiiiiis')
        $("#naviRight").removeClass("rightArrowEnable").addClass("rightArrowDisable").css({"pointer-events":"none", "cursor":"default"});
    }
    function popUpClose(ev){
      if(ev.type=="keyup" && ev.keyCode !=13){    
                 return  true; 
            }
         $('.popupContainer').hide();
		 popup=false;
         ResetFun();
         set_tabindex();
    }
    function fnhideScheme(ev){
      /* if(ev.type=="keyup" && ev.keyCode !=13){    
                 return  true; 
            } */
        $('.mainContainer').css('height','862px');
        $('.feedbacks').css('top','70px');
        // $(".directionText").show();
            $(this).hide();
            ResetFun();
            set_tabindex();
			$('.tabindex').eq(1).focus();	 
			$('.tabindex').eq(1).focus();	 
    }
	function set_tabindex(){
		if(begin_entered==false){
			$('.tabindex').removeClass('tabindex').removeAttr('tabindex');
			$('#begin_biganImg').addClass('tabindex');
			$('#begin_btn').addClass('tabindex');
			$('#begin_focus,#begin_end_focus').addClass('tabindex');
		}
		else if(next_page==false){
			$('.tabindex').removeClass('tabindex').removeAttr('tabindex');
			$('.directionTextStart').addClass('tabindex');
			$('#next_titleText').addClass('tabindex');
			$('#next_biganImg').addClass('tabindex');
			$('.nextBtn').addClass('tabindex');
			$('#next_focus,#next_end_focus').addClass('tabindex');
		}else if(popup==true){
			$('.tabindex').removeClass('tabindex').removeAttr('tabindex');
			$('#popup_txt').addClass('tabindex');
			$('.close-btn').addClass('tabindex');
			$('#popup_focus,#popup_end_focus').addClass('tabindex');
		}else{
			$('.tabindex').removeClass('tabindex').removeAttr('tabindex');
			$('.activityQuestion').addClass('tabindex');
			$('#activity_title').addClass('tabindex');
			
			
			$('.droparea').addClass('tabindex');
			$('.dragSpotWrapper').addClass('tabindex');
			
			
			$('.reset').addClass('tabindex');
			$('.viewCompleteScheme').addClass('tabindex');
			$('.hideCompleteScheme').addClass('tabindex');
			
			$('#activity_focus,#activity_end_focus').addClass('tabindex');
		} 
		$('.tabindex').each(function(){
				$('.tabindex').attr('tabindex','0');
		});
     }

/******************************************************************************************************************************/
	
	//Tab access codding

    var prevDroppedItem = '';
	var dropSpotPosition="";
    function handleDragByKey(event) {
        if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
            return true;
			//alert();
        }
        event.preventDefault();
	
		prevDroppedItem = '';
        dropSpotPosition = (this).id;
        
		//console.log('dropSpotPosition', dropSpotPosition);
		
		
        $('.dropspot').each(function(index) {
			$(".dragSpotWrapper").unbind('keydown').bind('keydown', handleDropByKey);
        });
		
		$(".headerFrame" + nSlideCounter + " .dragSpotWrapper").first().focus();
    }
	var draggedValueAttr;
	var droppedValueAttr;
	var childDivid;
	var ariaLabelValue;
    function handleDropByKey(event) {
        if (event.type == "keydown" && event.keyCode != 13 && event.keyCode != 32) {
            return true;

        }
        	event.preventDefault(); 
			var idVal=event.target.id
			console.log(idVal);
			ariaLabelValue=$('#'+idVal).attr('aria-label');
			
			
			$('#'+idVal+' > div').map(function() {
				childDivid= this.id;
				draggedValueAttr=$('#'+childDivid).attr('value');
			});
			
			tempParent=$("#"+childDivid).parent();
			
			droppedValueAttr=$("#"+dropSpotPosition).attr('data-repeated-id');
			if(draggedValueAttr==droppedValueAttr){
					
				
                $('.reset').removeClass('resetdesable');
                $("#"+dropSpotPosition).append($("#" + childDivid));
                $("#"+dropSpotPosition).removeClass('dropactive');
                $("#" + childDivid).addClass('dropFilled')
                var numId = childDivid.match(/\d+/);
                $('#'+childDivid+' > span').css('background-image','url("images/drop_'+numId+'.png")');
                $('#'+childDivid+' > span').html('');
				autoUpdatedDragBox(); 
				$("#" + childDivid).addClass('dragSuccess');			
				$("#" + dropSpotPosition).attr('data-val','true');			
				
				
				
				
				
				
				$("#"+dropSpotPosition).attr('aria-label',ariaLabelValue);
				
			
				$(".droparea[data-val='false']").first().focus();
				
  				if (CorrectOptionArray.length == $('.droppables .dragbox').length) {
                      // $('.reset').removeClass('resetdesable');
                      $('.popupContainer').show();
					  popup=true;
					 set_tabindex();	
                 }
				
			}else{
						
				$('#'+childDivid+' > span').css('color','red').fadeIn(1000);
				
				setTimeout(function(){
					$('#'+childDivid+' > span').css('color','#000').fadeIn();
				},500)
				
			}
    }

	
	
	
	

/******************************************************************************************************************************/	
	 
	 
	 