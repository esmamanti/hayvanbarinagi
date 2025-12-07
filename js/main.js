(function($) {

	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function() {
		var $owl = $('.carousel-testimony');

		// initialize carousel with grouping behavior (3-per-group on desktop)
		$owl.owlCarousel({
			center: false,
			loop: false,
			items: 3,
			slideBy: 3,
			margin: 30,
			stagePadding: 0,
			dots: false,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1,
					slideBy: 1
				},
				600:{
					items: 2,
					slideBy: 2
				},
				1000:{
					items: 3,
					slideBy: 3
				}
			}
		});

		// remove existing custom dots (if re-running scripts)
		$owl.next('.custom-dots').remove();

		// build custom 5-dot pagination (each dot represents a group of 3 items)
		var dotsCount = 5;
		var $customDots = $('<div class="owl-dots custom-dots" aria-hidden="false"></div>');
		for (var i = 0; i < dotsCount; i++) {
			$customDots.append('<button role="button" class="owl-dot" data-dot-index="' + i + '"><span></span></button>');
		}
		$owl.after($customDots);
		$customDots.find('.owl-dot').first().addClass('active');

		// when user clicks a custom dot, navigate to that group (3 items per group)
		$customDots.on('click', '.owl-dot', function() {
			var idx = $(this).data('dot-index');
			var total = $owl.find('.owl-item').length;
			var visible = $owl.find('.owl-item.active').length || 3;
			var target = idx * 3; // grouping size = 3
			if (target > total - visible) target = Math.max(0, total - visible);
			$owl.trigger('to.owl.carousel', [target, 300]);
		});

		// sync custom dots when carousel changes (manual swipe or autoplay)
		$owl.on('changed.owl.carousel', function(event) {
			var idx = Math.floor(event.item.index / 3);
			if (idx > dotsCount - 1) idx = dotsCount - 1;
			$customDots.find('.owl-dot').removeClass('active').eq(idx).addClass('active');
		});

	};
	carousel();



	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	$('.appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

	$('.appointment_time').timepicker();

})(jQuery);
$('.home-slider').owlCarousel({
  loop:true,
  autoplay:true,
  autoplayTimeout:4000,
  animateOut:'fadeOut',
  animateIn:'fadeIn',
  items:1,
  nav:false,
  dots:true
});
function openLoginModal(){
   document.getElementById("loginModal").style.display = "flex";
}
function closeLoginModal(){
   document.getElementById("loginModal").style.display = "none";
}

// ==============================
// LOGIN FORM - ADMIN REDIRECT
// ==============================
document.getElementById("loginForm")?.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // ADMIN GİRİŞ
    if(email === "admin@gmail.com" && password === "1234"){

        // Modal kapansın
        closeLoginModal();

        // ✅ ADMIN PANELİNE GİT
        window.location.href = "/js/admin/dashboard.html";

    } else {
        alert("Hatalı giriş bilgileri!");
    }

});



