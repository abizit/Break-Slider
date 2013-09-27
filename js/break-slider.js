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


    return this.each(function() {
    selector = $(this);             //Main Slider Selector
    selector.wrap('<div class="slider-wrapper"></div>'); //Create Wrapper for the entire Slider

    selector.children().each(function(i, elem){
      var j =i+1;
              $(this).attr('id', 'slide-' + j).addClass('slide-item').css({'display' : 'none'});
              
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
            selector.find('.slide-item').eq(0).addClass('current-slide').css({'display' : 'block'});
            $('.current-slide .cnt-right .cntnr-content').css({'left' : '0'});
            $('.current-slide .cnt-left .cntnr-content').css({'right' : '0'});
            $(pager).eq(0).addClass("active");
            adjHt = $('.current-slide').height();
            selector.height(adjHt);

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
                selector.find('.slide-item').eq(currentItem).removeClass('current-slide').fadeOut('10');
                disappear();
                 pager.eq(currentItem).removeClass("active");
                if(currentItem == numberOfItems -1){
                    currentItem = 0;
                }else{
                    currentItem++;
                }
                selector.find('.slide-item').eq(currentItem).addClass('current-slide').fadeIn();
                adjustHeight();
                appear();
                pager.eq(currentItem).addClass("active");
                
 
            }, variables.pause);
}//loop

function appear(){
   $('.current-slide .cnt-right .cntnr-content').animate({left : '0'});
   $('.current-slide .cnt-left .cntnr-content').animate({right : '0'});

}

function disappear(){
   $('.cnt-right .cntnr-content').animate({left : '-1500'});
   $('.cnt-left .cntnr-content').animate({right : '-1500'});

}

function adjustHeight(){
  adjHt = $('.current-slide').height();
                selector.height(adjHt);
 
}

function pagerControl(){
    pager.click(function(){
                  var id =$(this).attr('href');
                  selector.find('.slide-item').removeClass('current-slide').css({'display' : 'none'});
                  $(id).addClass('current-slide').css({'display' : 'block'});
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
       if($('.slide-item:last').hasClass('current-slide')){
          $('.slide-item:last').removeClass('current-slide').css({'display' : 'none'});
            firstSlide.addClass('current-slide').addClass(variables.effect).css({'display' : 'block'});
            activepager.removeClass('active').next().addClass('active');

        } else {

          $('.current-slide').removeClass('current-slide').css({'display' : 'none'}).next().addClass('current-slide').css({'display' : 'block'});
              
            activepager.removeClass('active').next().addClass('active');
        }
      clearInterval(infiniteLoop);
          return false;
      });
      $('.slide-prev').click(function(){
        var lastSlide = $('.slide-item:last');
          if($('.slide-item:first').hasClass('current-slide')){
            $('.slide-item:first').removeClass(variables.effect).removeClass('current-slide animated').css({'display' : 'none'});
            lastSlide.addClass('current-slide animated').addClass(variables.effect).css({'display' : 'block'});
          } else {
          $('.current-slide').removeClass(variables.effect).removeClass('current-slide animated').css({'display' : 'none'}).prev().addClass('current-slide animated').addClass(variables.effect).css({'display' : 'block'});
        }
          clearInterval(infiniteLoop);
          return false;
        });

}//prevNextControl
  


  }
})(jQuery);