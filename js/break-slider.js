/*
* Copyright 2013, Abhijeet Bajracharya
* Written at 27th September 2013
*
* https://twitter.com/_Abizit_
* abhijeetbajracharya@gmail.com
* https://github.com/abizit
*
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*/

(function($) {
  $.fn.abSlider = function(options) {
    var defaults = {
    pause: 5000
    }; 
        var variables = $.extend(defaults, options);
        var len;
        var infiniteLoop;  
        var currentItem = 0;
        var selector;
        var numberOfItems;
        var pager;
        var activepager;
        var adjHt;
        var rtWidth;
        var ltWidth;
        var effectime = 400;
    return this.each(function() {
    selector = $(this);             //Main Slider Selector
    selector.wrap('<div class="slider-wrapper" style="position:relative; width:100%;"></div>'); //Create Wrapper for the entire Slider

    selector.children().each(function(i, elem){
      var j =i+1;
              $(this).attr('id', 'slide-' + j).addClass('slide-item').css({'display' : 'none' , 'position' : 'absolute', 'width' : '100%'});
              
            });//assign ID to each slide            

            //count number of slide          
            selector.each(function(i, elem){        
              len = $(this).children().length;
                 });
            numberOfItems = len;
            
            //generate pagination and slider navigation
            $('.slider-wrapper').append('<div class="slidepagers"></div>');
            $('.slider-wrapper').append('<div class="slide-nav"><a href="" class="slide-prev">previous</a><a href="" class="slide-next">next</a></div>');
            for (var i=1; i<=len; i++){
              
              $('.slidepagers').append('<a href="'+'#slide-'+i+'" class="slidepage">'+i+'</a>');
            }
            pager =$('.slidepage');
             $('.slide-item').children().each(function(i,elem){
                $(this).addClass('side').css({'float': 'left',
                    'height' : '100%',
                    'overflow' : 'hidden',
                    'position' : 'relative'
                  });
                $('.side:first-child').addClass('cnt-left');
                $('.side:last-child').addClass('cnt-right');
             });
                      
            $('.side').wrapInner('<div class="cntnr-content" style="position: relative;width: 100%; height: 100%;"></div>');
            $('.cnt-right .cntnr-content').css({'left':'-200%'});
             $('.cnt-left .cntnr-content').css({'right':'200%'});
            selector.find('.slide-item').eq(0).addClass('current-slide').css({'display' : 'block'});
            $('.current-slide .cnt-right .cntnr-content').css({'left' : '0'});
            $('.current-slide .cnt-left .cntnr-content').css({'right' : '0'});
            $(pager).eq(0).addClass("active");
            adjHt = $('.current-slide').height();
            selector.height(adjHt).css({'position' : 'relative'});

            //Slide Loop
            loop();

            // Page Control 
            pagerControl();

            //Previous Next Button
            prevNextControl();  
              
           
    });

//The slide Looper
function loop(){
          infiniteLoop = setInterval(function(){
                selector.find('.slide-item').eq(currentItem).removeClass('current-slide').fadeOut(effectime);
                disappear();
                pager.eq(currentItem).removeClass("active");
                if(currentItem == numberOfItems -1){
                    currentItem = 0;
                }else{
                    currentItem++;
                }
                selector.find('.slide-item').eq(currentItem).addClass('current-slide').fadeIn(effectime);
                adjustHeight();
                appear();
                pager.eq(currentItem).addClass("active");
            
            }, variables.pause);
}//loop

function appear(){
   $('.current-slide .cnt-right .cntnr-content').animate({left : '0'},effectime);
   $('.current-slide .cnt-left .cntnr-content').animate({right : '0'},effectime);

}

function disappear(){
   $('.cnt-right .cntnr-content').animate({left : '-200%'},effectime);
   $('.cnt-left .cntnr-content').animate({right : '-200%'},effectime);

}

function adjustHeight(){
  adjHt = $('.current-slide').height();
                selector.height(adjHt);
 
}

function pagerControl(){
    pager.click(function(){
                  disappear();
                  var id =$(this).attr('href');
                  selector.find('.slide-item').removeClass('current-slide').fadeOut();
                  $(id).addClass('current-slide').fadeIn();
                  adjustHeight();
                  appear();
                  pager.removeClass('active');
                  $(this).addClass('active');
                   clearInterval(infiniteLoop);
                  return false;
                  });
}//pagerControl
function prevNextControl(){
      $('.slide-next').click(function(){
        var firstSlide = $('.slide-item:first');
         activepager = $('.slidepage.active'); 
         disappear();
         activepager.removeClass('active').next().addClass('active');
       if($('.slide-item:last').hasClass('current-slide')){
          $('.slide-item:last').removeClass('current-slide').fadeOut();

            firstSlide.addClass('current-slide').fadeIn();
            adjustHeight();
            appear();
          } else {
          $('.current-slide').removeClass('current-slide').fadeOut().next().addClass('current-slide').fadeIn();
            adjustHeight();
            appear();
            }
         var ida=$('.current-slide').attr('id');
         $('.slidepage[href*='+ ida +']').addClass('active');
        
      clearInterval(infiniteLoop);
          return false;
      });
      $('.slide-prev').click(function(){
        var lastSlide = $('.slide-item:last');
        activepager = $('.slidepage.active');
        disappear();
        activepager.removeClass('active').prev().addClass('active');
          if($('.slide-item:first').hasClass('current-slide')){
            $('.slide-item:first').removeClass('current-slide').fadeOut();
            lastSlide.addClass('current-slide').fadeIn();
            adjustHeight();
            appear();
            $('.slidepage[href*='+ ida +']').addClass('active');
          } else {
            $('.current-slide').removeClass('current-slide').fadeOut().prev().addClass('current-slide').fadeIn();
            adjustHeight();
            appear();
          }
          var ida=$('.current-slide').attr('id');
           $('.slidepage[href*='+ ida +']').addClass('active');
          
          clearInterval(infiniteLoop);
          return false;
        });

}//prevNextControl
  


  }
})(jQuery);