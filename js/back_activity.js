(function(Player) {
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
        set_tabindex();  
        $(document).bind("keydown mousedown",enable_scorm);
        $("#naviLeft").bind("click keyup",fnBack);
        $("#naviRight").bind("click keyup",fnNext);
        $(".close-btn").bind("click keyup",popUpClose);
        $(".hideCompleteScheme").bind("click keyup",fnhideScheme);
        startActivity(); 
          $('.mainContainer').css('height','628px');
        $(".beginBtn").bind("click",fnBegin);      
          
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
       $("#pageContainer").show();
        $(".beginPage").hide();
        $('.mainContainer').css('height','772px');
        
    }

    function init() {
       // $('.reset').off('keyup')
        acceptance = false;
        dropHover = false;
        AnsDropped = new Array();
        DragSet = "";
        DropSet = "";
        Count = 0;
      
        $("title").append(data[0].headTitle);
		$(".biganImg").attr("src", data[0].biganImg);
        $(".containerTitle").append(data[0].bodyTitle);
        $(".questionText").append(data[0].question);
        $(".direction").append(data[0].direction);
        $(".directionText").append(data[0].directionTextBegin);
        $(".footNote").append(data[0].foootNote);
		$("title").append(data[0].headTitle);
        $(".popup > p").append(data[0].popupShow);

        CorrectOptionArray = data[0].CorrectOptionArray;
        OptionArray = data[0].OptionArray;
        repeatedOption = data[0].repeatedOption;

        // console.log('CorrectOptionArray : ',repeatedOption);
        
        OptionArray=shuffle(OptionArray); // Shuufle Arrray

         // -----------------Set DropAble Area---------//  
         for (var i = 0; i < CorrectOptionArray.length; i++) {

            // for(var j=0; j< repeatedOption.length;j++){
                // tempRepeteddVal 
                if(CorrectOptionArray[i] != ''){
                  tempRepeteddVal = CorrectOptionArray[i];
                }else{
                  tempRepeteddVal=i;
                }
                
              DropSet += '<div id="dropSpot_' + i + '" class="droparea dropactive dropspot" data-repeated-id="'+tempRepeteddVal+'"><div class="activtedAnswers"></div></div>';
          // }
        }
      
        var j=0;
        var firstFrameDragElement=3;
         DragSet += '<div class="frame headerFrame'+j+'">'; 

           for (var i = 0; i < OptionArray.length; i++) { 
            
            console.log('j : ',j);
            console.log('OptionArray : ',OptionArray.length);

                  DragSet += '<div id="dragSpot_' + i + '_td" class="dragSpotWrapper"><div id="dragSpot_' + OptionArray[i] + '" class="dragbox normal box dragSpot" value="' + OptionArray[i] + '">'+'<span></span>'+'</div></div>';
       
        console.log('i =========== : ',i);
       
            if((i+1) % 11 == 0)
                  {
                    
                    DragSet += '</div>';
                    j++;
                    DragSet += '<div class="frame headerFrame'+j+'">'; 
                  }
           }
            DragSet += '</div>';

        $(".draggable").html(DragSet);
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
                // tempParent=$(abc).attr('id')
             
             },
            appendTo: $('.quizeSection'), 
            containment: $(".contain"),
            drag: function(event, ui) {
            },
           
            stop: function(event, ui) {

            if($(this).parent().hasClass('dropspot'))
                 {
                   $(this).addClass('dragSuccess');// Drag Success
                 }
             else
                { 
                  $(this).css({"left": "0px","top": "0px"});//Drag Revert Back 
                  $(this).hover(
                      function() {
                        $( this ).css('border','1px solid #007098');
                      },
                      function() {
                        $( this ).css('border','');
                      });
                 }

            }
        }; // Close Draggable


        $(".dragbox").draggable(optionsDrag);

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
                            autoUpdatedDragBox();
							$("#"+DragID).css('position', 'initial');
							//$("#dropSpot_"+id_arr[1]).css('position', 'initial');
                        }
                  }

                AnsDropped[Number(DragID.replace("dragSpot_", ""))] = DragID;

                  $('#'+DropID).removeProp('background');
                  $(".reset").css("pointer-events", "")
                 // count++;
                  
                if (CorrectOptionArray.length == $('.droppables .dragbox').length) {
                      // $('.reset').removeClass('resetdesable');
                      $('.popupContainer').show();
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
         $(".reset").off().on("click keyup", function(ev) {
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
        $(".viewCompleteScheme ").on("click keyup", function(ev) {
           if(ev.type=="keyup" && ev.keyCode !=13){    
                 return  true; 
            }
        $('.reset').hide(); 
        $('.hideCompleteScheme').show();
        $(this).hide();
        $('.droppables').css('display','none');
        $('.quizeSection').addClass('answerImage');
        $('.footer').addClass('hide');
        $('.footNote').removeClass('hide');
        $('.mainContainer').css('height','610px');
        $('.feedbacks').css('top','-302px');
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
                $("#dropSpot_" + index).css('background','none');
              });
   		$(".dropspot").css('height', data[0].drop_height);
		$(".dropspot").css('width', data[0].drop_width);
		$(".dragbox").css('height', data[0].drag_height);
		$(".dragbox").css('width', data[0].drag_width);
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
            $(".droparea").each(function(index) 
              {
                $("#dropSpot_" + index).removeClass('active').addClass('dropactive');
                $("#dropSpot_" + index).css('background','none');
              });  

		$(".dropspot").css('height', data[0].drag_height);
		$(".dropspot").css('width', data[0].drag_width);
		$(".dragbox").css('height', data[0].drag_height);
		$(".dragbox").css('width', data[0].drag_width);
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

    function set_tabindex(){
            var tab_index=1;
            $(".tabindex").each(function(index){
                $(this).removeAttr("tabindex");
                    $(this).attr("tabindex",tab_index);
                    tab_index++;
                // }
            });
	}
   
    function autoUpdatedDragBox() {

             lastFrame = $('.draggable > div').last();
             lastFrameDragSpot = $(lastFrame).children().first();

             currentFrame = $(tempParent).parent();
             // console.log('currentFrame>>>>>',currentFrame)
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
     Player.returnPageArray = function() {
        return aSlidesArray;
    }

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
         ResetFun();
         set_tabindex();
    }
    function fnhideScheme(ev){
      if(ev.type=="keyup" && ev.keyCode !=13){    
                 return  true; 
            }

        $('.mainContainer').css('height','772px');
        $('.feedbacks').css('top','-32px');
            $(this).hide();
            ResetFun();
            set_tabindex();
    }
})(App = App || {})
var App;