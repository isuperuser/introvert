var html = $('html');
var body = html.find('body');
var htDy = $('html,body');
var win = $(window);
var doc = $(document);
var self;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {} else {
    document.querySelector('body').classList.add('desktop');
    html.addClass('desktop')
};

doc.ready(function() {
    var productDemoSwiper = new Swiper('#productDemoSwiper', {
        preloadImages: false,
        lazy: true,
        grabCursor:true,
        navigation: {
            nextEl: '#productDemoSwiperNext',
            prevEl: '#productDemoSwiperPrev',
        }
    });

    
    $('[data-fancybox]').fancybox({
		backFocus: false,
	});
	$('[data-type]').fancybox({
		backFocus: false,
		touch:false,
	});

	$('#productDemoFancyTrigger').on('click', function(){
		$('#productDemoSwiper').find('.swiper-slide-active [data-fancybox]').click()
		return false
	});

	var note = $('#note'),
		ts = new Date(2020, 10, 24),
		newYear = true;
	
	if((new Date()) > ts){
		// The new year is here! Count towards something else.
		// Notice the *1000 at the end - time must be in milliseconds
		ts = (new Date()).getTime() + 10*24*60*60*1000;
		newYear = false;
	}

	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += days + "Дней" + ( days==1 ? '':'s' ) + ", ";
			message += hours + " Часов" + ( hours==1 ? '':'s' ) + ", ";
			message += minutes + " Минут" + ( minutes==1 ? '':'s' ) + " and ";
			// message += seconds + " Секунд" + ( seconds==1 ? '':'s' ) + " <br />";
			
			if(newYear){
				message += "left until the new year!";
			}
			else {
				message += "left to 10 days from now!";
			}
			
			note.html(message);
		}
	});

	$('#navTrigger').on('click', function(){
    	if(html.hasClass('nav-opened')){
    		html.removeClass('nav-opened')
    	}else{
    		html.addClass('nav-opened')
    	};
    	return false
    });


    html.addClass('loaded');
});

var currentX = '';
var currentY = '';
var movementConstant = .015;
doc.mousemove(function(e) {
  if(currentX == '') currentX = e.pageX;
  var xdiff = e.pageX - currentX;
  currentX = e.pageX;
   if(currentY == '') currentY = e.pageY;
  var ydiff = e.pageY - currentY;
  currentY = e.pageY; 
  $('#productDemoDecor').each(function(i, el) {
      var movement = (i + 1) * (xdiff * movementConstant);
	  var movementy = (i + 1) * (ydiff * movementConstant);
      var newX = $(el).position().left + movement;
	  var newY = $(el).position().top + movementy;
      $(el).css('left', newX + 'px');
	  $(el).css('top', newY + 'px');
  });
});

// the end. all the best!