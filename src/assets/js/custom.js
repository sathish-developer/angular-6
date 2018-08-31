/* =================================
------------------------------------
	GoPolicy - Landing Page Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/


'use strict';

(function ($) {

  /*------------------
  	Background set Benifits of Go
  --------------------*/
  $('.set-bg').each(function () {
    var bg = $(this).data('setbg');
    $(this).css('background-image', 'url(' + bg + ')');
  });


  /*------------------
  	Benifits of Go
  --------------------*/
  var review_meta = $(".review-meta-slider");
  var review_text = $(".review-text-slider");


  review_text.on('changed.owl.carousel', function (event) {
    review_meta.trigger('next.owl.carousel');
  });

  review_meta.owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    items: 3,
    center: true,
    margin: 20,
    autoplay: true,
    mouseDrag: false,
  });


  review_text.owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    items: 1,
    margin: 20,
    autoplay: true,
    navText: ['<i class="fas fa-angle-left"><i>', '<i class="fas fa-angle-right"><i>'],
    animateOut: 'fadeOutDown',
    animateIn: 'fadeInDown',
  });

})(jQuery);

$.scrollify({
  section: ".scrollify",
  sectionName: false,
  scrollSpeed: 1500,
  interstitialSection: ".footer-end"
});
