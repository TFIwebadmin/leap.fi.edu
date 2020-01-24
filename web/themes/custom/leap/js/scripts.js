(function ($) {
  
  $('.play-button').click(function () {
      $('.play-button').not(this).siblings('.video-player').removeClass('show');
      $(this).siblings('.video-player').addClass('show');
      $('.video-embed-field-responsive-video iframe').each(function() {
        var player = $f(this);
        player.api("pause");
      });
  }).trigger('click');


  $('.close-video-player').click(function () {
      $('.video-player').removeClass('show');

      $('.video-embed-field-responsive-video iframe').each(function() {
        var player = $f(this);
        player.api("pause");
      });
      
  }).trigger('click');

})(jQuery);

(function () {

  jQuery('.menu-btn').click(function(){

    if( jQuery('body').hasClass("menu-open")) {
      jQuery('body').removeClass("menu-open");
      jQuery(this).parent().removeClass("active");
      jQuery('#nav-wrapper').removeClass('slide-nav');
      
      console.log('banan')
    }else {
      console.log('not banan')
      jQuery('body').addClass("menu-open");
      jQuery(this).parent().addClass("active");
      jQuery('#nav-wrapper').addClass('slide-nav');
        
    }
  })

})();


(function () {
  jQuery('.video-carousel').slick({
    dots: true,
    centerMode: true,
    slidesToShow: 3,
    infinite: true,
    variableWidth: true,
    arrows:true,
    mobileFirst: true,
  });
})();

(function () {

  var toggleFAQItem = function (selectedIdx) {
    jQuery('.faq-accordion ul li .faq-wrapper').each(function (idx, element) {
      if (selectedIdx === idx && !jQuery(element).hasClass('expanded')) {
        jQuery(element).delay(1000).addClass('expanded');
        return;
      }

      jQuery(element).removeClass('expanded');
    });
  }

  //Hides and shows the blocks of questions
  var toggleSelectedFAQHeader = function (selectedIdx) {

    //hides or shows the selected views
    jQuery('.faq-accordion .views-row').each(function (idx, element) {
      if (selectedIdx === idx) {
        jQuery(element).show();
        return;
      }

      jQuery(element).hide();
    });

    //toggles the correct style on the selected nav item
    jQuery('.faq-accordion header h3').each(function (idx, element) {
      if (selectedIdx === idx) {
        jQuery(element).addClass('active');
        return;
      }

      jQuery(element).removeClass('active');
    });

    toggleFAQItem(-1);
  }

  //Initialize the nav click
  jQuery('.faq-accordion header h3').each(function(idx, element) {
    jQuery(element).click(function () {
      toggleSelectedFAQHeader(idx)
    })

    if (idx === 0) {
      jQuery(element).trigger('click');
    }
  });

  //Initialize the actual faq stuff
  jQuery('.faq-accordion ul li').each(function (idx, element) {
    jQuery(element).click(function () {
      toggleFAQItem(idx)
    })
  })
})();
