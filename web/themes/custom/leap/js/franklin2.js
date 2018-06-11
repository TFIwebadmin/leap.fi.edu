/*
 * The Franklin Institute - Website Redesign
 * @Description Main Javascript file
 * @author Putra Roeung and Greg Sarault
 * @copyright 2013 Bluecadet, info@bluecadet.com
 ***********************************************/

 /* Removed animations that shifted homepage slides to the right, by applying a 10% left margin in CSS. */
 /* Removed width restriction on flexslider li containers. */
 /* Todd Viola, 4 Dec 2015 */

(function ($, Drupal, window, document, undefined) {

/**************************************************
  Global Variables!!!
**************************************************/

var winWidth = jQuery(window).width(),
    winHeight = jQuery(window).height(),
    device,
    mq = jQuery('#mediaquery')[0],
    html = jQuery('html'),
    isIE = false;

/**************************************************
  Custom Fuctions
**************************************************/

function toggleMenu() {
  //Mobile - Menu Toggle
  $('.menu-btn').toggle(function() {
    $('body').addClass("menu-open");
    $(this).parent().addClass("active");
  }, function() {
    $('body').removeClass("menu-open");
    $(this).parent().removeClass("active");
  })
;}

//Function to reset any styles that may have been changed on screen resize
function resetStyles() {
  if (device == 'mobile'){
    $('body').addClass('mobile');
    $('#nav-wrapper').addClass('slide-nav');
    $('ul.menu-lvl-1 > li.expanded').removeClass('dropdown');
    $("#hero > .image, #hero-slideshow").removeClass('parallax');
    $('.breadcrumbs .active').siblings('ul.breadcrumb-dropdown').css('display', 'block');
    $('#hero .image img, #hero-slideshow .field-exhibit-hero-image, #hero-slideshow .field-hero-slideshow').removeAttr('style');
    if($('.breadcrumbs > ul > li').length > 4){
      $('.breadcrumbs > ul').removeClass('level-5');
    }
    $('.results-image ol li.item').removeAttr('style');
    toggleMenu();
    mapDropdown();
  }
  else {
    $('body').removeClass("mobile");
    $('#nav-wrapper').removeClass('slide-nav');
    $('ul.menu-lvl-1 > li.expanded').addClass('dropdown');
    $('body').removeClass("menu-open");
    $('.menu-btn').parent().removeClass("active");
    $("#hero > .image, #hero-slideshow").addClass('parallax');
    $(".breadcrumbs ul").removeAttr('style');

    if($('.breadcrumbs > ul > li').length > 4){
      $('.breadcrumbs > ul').addClass('level-5');
    }
    thingsPosition();
  }
}

function tileAccordion() {
  if (device == 'mobile'){
    $('#node-5105 .tile-body h1:nth-child(1)').nextAll('h1').addClass('accord-head');
    $('#node-5105 .tile-body p:nth-child(2)').nextAll('p').addClass('accord-body');
  }else {
    $('#node-5105 .tile-body h1:nth-child(1)').nextAll('h1').removeClass('accord-head');
    $('#node-5105 .tile-body p:nth-child(2)').nextAll('p').removeClass('accord-body');
  }
}

//Create an event checker function that grabs the current value of the after pseudo class of the #mediaquery <div>
function deviceCheck() {
  if (isIE) {
    device = 'desktop';
  } else {
    device = window.getComputedStyle(mq,':after').getPropertyValue('content').replace(/'/g,"").split('"').join('');
    resetStyles();
    tileAccordion();
  }
}

function smoothScroll() {
  $('.carousel-title a').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 800);
        return false;
      }
    }
  });
}

//Easing functions
$.extend($.easing,{
    easeOutQuad:function(e,f,a,h,g){
        return -h*(f/=g)*(f-2)+a;
    },
    easeInOutQuad: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
    }
});

var duration = 400;
var easing = 'easeInOutQuad';

$.fn.slideFadeToggle = function (speed, easing, callback) {
  return this.animate({
    opacity: 'toggle',
    height: 'toggle'
  }, callback);
};

// The .share-links-block was replaced in March 2016, eliminating the need for the .share-show toggle.
// In 2016, we modified the Exhibit node template to remove the Read More/Read Less toggle buttons.

// function textShowHide() {
//   var contentRegion = $('.node-type-exhibit .exhibit-summary');
//   if (contentRegion.children().length > 2) {
//     $('#show-hide').removeClass('element-hidden');
//     contentRegion.children().eq(2).nextUntil('div').andSelf().wrapAll('<div class="hidden-text">');
//   }

//   $('#show-hide a').toggle(function () {
//     $(this).addClass('less');
//     $(this).removeClass('more');
//     $('.hidden-text', contentRegion).slideFadeToggle();
//     $(this).html('Read Less');
//   }, function () {
//     $(this).removeClass('less');
//     $(this).addClass('more');
//     $('.hidden-text', contentRegion).slideFadeToggle();
//     $(this).html('Read More');
//     return false;
//   });

//   $('#share-show').toggle(function () {
//     $(this).addClass('less');
//     $(this).removeClass('more');
//     $('.share-links-block ul').slideFadeToggle(200);
//   }, function () {
//     $(this).removeClass('less');
//     $(this).addClass('more');
//     $('.share-links-block ul').slideFadeToggle(200);
//     return false;
//   });
// }

// Basic Page Accordion
function toggleBelow() {
  $('.toggle-content').hide();

  $('.toggle-below').click(function(){
    $(this).siblings('.toggle-content').slideToggle();
    $(this).children('.toggle-content').slideToggle();
    $(this).toggleClass('show');
    return false;
  });

  $('.show-all').toggle(function () {
    $('.toggle-below').addClass('show');
    $('.toggle-below').siblings('.toggle-content').slideUp().slideDown();
    $(this).html('Hide All');
  }, function () {
    $('.toggle-below').removeClass('show');
    $('.toggle-below').siblings('.toggle-content').slideDown().slideUp();
    $(this).html('Show All');
    return false;
  });
}

// So Only one checkbox can be checked at a time.
function onlyOneChecked() {
  $("input:checkbox").click(function () {
    $("[name="+$(this).prop('name')+"]").prop("checked", false);
    $(this).prop("checked", true);
  });
}

function mobileBread() {
  // Displaying Active button
  $('.breadcrumbs .active').siblings('ul.breadcrumb-dropdown').css('display', 'block');
  $('.breadcrumbs .active').siblings('.mobile-menu-toggle').addClass('open');

  // Show and hide lists
  $('.mobile-menu-toggle').click(function(){
    $(this).siblings('ul').slideFadeToggle();
    $(this).toggleClass('open');
    return false;
  });
}

function sameHeight() {
  var maxHeight = 1;
   $('body.node-type-landing-page div.flexslider .tile-callout').each(function() {
     maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
   });

   $('body.node-type-landing-page div.flexslider .tile-callout').each(function() {
     $(this).height(maxHeight);
   });
}

function initHomeSlide() {
  if($('#block-views-home-slider-block').get(0)){

    $.fn.toEm = function(settings){
      settings = jQuery.extend({
          scope: 'body'
      }, settings);
      var that = parseInt(this[0],10),
          scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope),
          scopeVal = scopeTest.height();
      scopeTest.remove();
      return (that / scopeVal).toFixed(8) + 'em';
    };

    $('.home-slide-tabs').flexslider({
      selector: "ul.slides > li",
      animation: "slide",
      controlNav: false,
      directionNav: false,
      animationLoop: false,
      slideshow: false,
      smoothHeight: true,
      itemWidth: 110,
      itemMargin: 0,
      touch: true,
      asNavFor: ".home-slider"
    });

    var windowWidth = $(window).width();
    var windowWidthEm = $(windowWidth).toEm();
    windowWidthEm = parseInt(windowWidthEm);
    var isMobile = ( windowWidthEm < 72 ) ? true : false; /* Changed to fix issue with tablets, original value 64 */
    var animationSpeed = ( isMobile ) ? 600 : 0;

    $(".home-slider").flexslider({
      selector: "ul.slides > li",
      direction: "horizontal",
      animationSpeed: animationSpeed,
      animationLoop: true,
      directionNav: true,
      slideshow: isMobile,
      controlNav: false,
      touch: true,
      sync: ".home-slide-tabs",
      animationLoop: true,
      start: function (slider) {
        slider.slides.css({"width": "100%", "float": "none", "marginRight": "0", "position": "absolute"});

        $("#block-views-home-slider-block").find("#load-holder").remove();
        $(".home-slider").css('opacity', '1');
        $(".home-slide-tabs").css('opacity', '1');

        nextSlide = slider.currentSlide + 1;
        var $currSlide = slider.slides.eq(slider.currentSlide);
        var $nextSlide = slider.slides.eq(nextSlide);

        slider.slides.css('z-index', 1);
        $nextSlide.css('z-index', 2);
        $currSlide.css('z-index', 3);

        $nextSlide.find('.slide-nex-text').fadeIn(500);

        if(!isMobile) {
          var slideImageContainerWidth = slider.w + parseInt( slider.w / 5 );
          var slideImageContainerHeight = slider.h + parseInt( slider.h / 5 );

          slider.slides.find('.slide-image').css({
            'width': slideImageContainerWidth + 'px'
          });

          slider.slides.find('.slide-image > span').css({
            'width': slideImageContainerWidth + 'px',
            'height': slideImageContainerHeight + 'px',
            'margin-top': - parseInt( slider.h / 10 ) + 'px'
          });

          $nextSlide.find('.slide-image').css({
            'width': slideImageContainerWidth + 'px'
          });
          $nextSlide.find('.slide-image > span').css({
          });
        }

        $nextSlide.find('.slide-image > span').addClass('overlay-active');
        $nextSlide.find('.slide-image > span').addClass('grayscale');
      },
      before: function (slider) {
        slider.previousSlide = slider.currentSlide;
      },
      after: function (slider) {
        if(isMobile) return false;

        var $prevSlide = slider.slides.eq(slider.previousSlide);
        var $currSlide = slider.slides.eq(slider.currentSlide);
        var nextSlide = slider.currentSlide + 1;
        if(nextSlide == slider.count) nextSlide = 0;
        var $nextSlide = slider.slides.eq(nextSlide);

        var $prevSlideImageContainer = $prevSlide.find('.slide-image');
        var $prevSlideImage = $prevSlide.find('.slide-image > span');
        var $prevSlideInfo = $prevSlide.find('.overlay-info');
        var $prevSlideText = $prevSlide.find('.slide-nex-text');

        var $currSlideImageContainer = $currSlide.find('.slide-image');
        var $currSlideImage = $currSlide.find('.slide-image > span');
        var $currSlideInfo = $currSlide.find('.overlay-info');
        var $currSlideText = $currSlide.find('.slide-nex-text');

        var $nextSlideImageContainer = $nextSlide.find('.slide-image');
        var $nextSlideImage = $nextSlide.find('.slide-image > span');
        var $nextSlideInfo = $nextSlide.find('.overlay-info');
        var $nextSlideText = $nextSlide.find('.slide-nex-text');

        slider.slides.css('z-index', 1);

        var slideImageContainerWidth = slider.w + parseInt( slider.w / 5 );

        //forward animation
        if((slider.direction == 'next' && slider.previousSlide == 0 && slider.currentSlide == 1)
          ||
          (slider.direction == 'next' && slider.previousSlide != 0)
          ||
          (slider.direction == 'prev' && slider.previousSlide == slider.count - 1 && slider.currentSlide == 0)) {

          //style and animate
          $prevSlide.css('z-index', 3);
          $currSlide.css('z-index', 2);

          $prevSlideInfo.fadeOut(200);
          $prevSlideImageContainer.css({'width': slideImageContainerWidth + 'px'});

          $prevSlideImageContainer.css({
            'width': slideImageContainerWidth + 'px'
          });

          $currSlideInfo.fadeOut(200);
          $nextSlideImage.addClass('overlay-active');

          $prevSlideImageContainer.animate({
            width: parseInt( slider.w / 15 ) + 'px'
          }, 800, 'easeInOutQuad', function() {

            $nextSlideImage.addClass('grayscale');

            slider.slides.css('z-index', 1);

            $nextSlide.css('z-index', 2);
            $currSlide.css('z-index', 3);

            $prevSlideImageContainer.css({'width': slideImageContainerWidth + 'px'});

/*
            $currSlideImage.animate({
             //'margin-left':  -parseInt( slider.w / 10 ) + 'px'
            }, 400, 'easeOutQuad', function() {
              $('.slide-nex-text').hide();
              $nextSlideText.fadeIn(500);
            });
*/

            $nextSlideImageContainer.css({
              'width': slideImageContainerWidth + 'px'
            });

            $prevSlideInfo.fadeIn(600);
          });
          $currSlideInfo.delay(400).fadeIn(800);
          $currSlideImage.removeClass('grayscale');
          $currSlideImage.removeClass('overlay-active');
          $currSlideText.fadeOut(400);
        }
        //backward animation
        else {
          $prevSlide.css('z-index', 2);
          $currSlide.css('z-index', 3);

          $prevSlideInfo.fadeOut(400);
          $currSlideImageContainer.css('width', parseInt( slider.w / 5 )+ 'px');
          $currSlideInfo.hide();

          $currSlideText.fadeOut(200);

          $currSlideImageContainer.animate({
            width: slideImageContainerWidth + 'px',
          }, 700, 'easeInOutQuad', function() {

            slider.slides.css('z-index', 1);

            $prevSlideInfo.show();
            $currSlideInfo.fadeIn(400);
            $currSlide.css('z-index', 3);

/*
            $currSlideImage.animate({
             //'margin-left':  -parseInt( slider.w / 10 ) + 'px'
            }, 400, 'easeOutQuad', function() {
              $('.slide-nex-text').hide();
              $nextSlideText.fadeIn(500);
            });
*/

            $nextSlide.css('z-index', 2);
            $nextSlideImageContainer.css({
              'width': slideImageContainerWidth + 'px'
            });

/*
            $nextSlideImage.css({
              //'margin-left':  parseInt( slider.w / 10 ) + 'px'
            }).addClass('overlay-active');
*/
            $nextSlideImage.addClass('grayscale');
          });
          $currSlideImage.removeClass('overlay-active');
          $currSlideImage.removeClass('grayscale');
          $currSlideText.fadeOut(400);
        }
      }
    });
  }
}

function initHeroSlider() {
  if($('#hero-slideshow').get(0)){
    $('#hero-slideshow .flexslider').flexslider({
      selector: "ul.field-exhibit-hero-image > li, ul.field-hero-slideshow > li",
      animation: "fade",
      touch: true,
      animationLoop: true,
      direction: "horizontal",
      slideshow: false,
      controlsContainer: "carousel-nav-paginated",
      start: function(slider) {
          $('.total-slides').text(slider.count);
          if(slider.slides.length == 1){
            $('.carousel-nav-paginated').addClass('hide-this');
          }
      },
      after: function(slider) {
        $('.current-number').text(slider.currentSlide + 1);
      }
    });
  }
}

// Added function to parse URL query string params, Todd Viola, 10 Dec 2015
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}



function initgallerySlider() {

  // associative object the key is the get parameter name
  var $_GET = getQueryParams(document.location.search);

  // Image Gallery #1
  $('#image-gallery-1 #gallery-thumb').flexslider({
    selector: "ul.slides > li",
    animation: "slide",
    controlNav: false,
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth:110,
    itemMargin: 5,
    startAt: (($_GET['img']) ? $_GET['img'] : 0),  // Start on specific slide if img param exsits in query string
    touch: true,
    asNavFor: '#image-gallery-1 #gallery-slider'
  });
  $('#image-gallery-1 #gallery-slider').flexslider({
    selector: "ul.slides > li",
     animation: "slide",
     controlNav: false,
     directionNav: true,
     animationLoop: false,
     slideshow: false,
     //itemWidth: 634,
     itemMargin: 0,
     minItems: 1,
     maxItems: 100,
     startAt: (($_GET['img']) ? $_GET['img'] : 0), // Start on specific slide if img param exsits in query string
     touch: true,
     sync: "#image-gallery-1 #gallery-thumb"
   });

  // Image Gallery #2
  $('#image-gallery-2 #gallery-thumb').flexslider({
    selector: "ul.slides > li",
    animation: "slide",
    controlNav: false,
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 110,
    itemMargin: 5,
    touch: true,
    asNavFor: '#image-gallery-2 #gallery-slider'
  });
  $('#image-gallery-2 #gallery-slider').flexslider({
    selector: "ul.slides > li",
     animation: "slide",
     controlNav: false,
     directionNav: true,
     animationLoop: false,
     slideshow: false,
     smoothHeight: true,
     //itemWidth: 634,
     touch: true,
     sync: "#image-gallery-2 #gallery-thumb"
   });

  // Image Gallery #3
  $('#image-gallery-3 #gallery-thumb').flexslider({
    selector: "ul.slides > li",
    animation: "slide",
    controlNav: false,
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 110,
    itemMargin: 5,
    touch: true,
    asNavFor: '#image-gallery-3 #gallery-slider'
  });
  $('#image-gallery-3 #gallery-slider').flexslider({
    selector: "ul.slides > li",
     animation: "slide",
     controlNav: false,
     directionNav: true,
     animationLoop: false,
     slideshow: false,
     smoothHeight: true,
     //itemWidth: 634,
     touch: true,
     sync: "#image-gallery-3 #gallery-thumb"
  });

  // Image Gallery #4
  $('#image-gallery-4 #gallery-thumb').flexslider({
    selector: "ul.slides > li",
    animation: "slide",
    controlNav: false,
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 110,
    itemMargin: 5,
    touch: true,
    asNavFor: '#image-gallery-4 #gallery-slider'
  });
  $('#image-gallery-4 #gallery-slider').flexslider({
    selector: "ul.slides > li",
     animation: "slide",
     controlNav: false,
     directionNav: true,
     animationLoop: false,
     slideshow: false,
     smoothHeight: true,
     //itemWidth: 634,
     touch: true,
     sync: "#image-gallery-4 #gallery-thumb"
  });

  // Image Gallery #5
  $('#image-gallery-5 #gallery-thumb').flexslider({
    selector: "ul.slides > li",
    animation: "slide",
    controlNav: false,
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 110,
    itemMargin: 5,
    touch: true,
    asNavFor: '#image-gallery-5 #gallery-slider'
  });
  $('#image-gallery-5 #gallery-slider').flexslider({
    selector: "ul.slides > li",
     animation: "slide",
     controlNav: false,
     directionNav: true,
     animationLoop: false,
     slideshow: false,
     smoothHeight: true,
     //itemWidth: 634,
     touch: true,
     sync: "#image-gallery-5 #gallery-thumb"
  });

  // field_media_image gallery
  $('.field-media-image #gallery-thumb').flexslider({
    selector: "ul.slides > li",
    animation: "slide",
    controlNav: false,
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 110,
    itemMargin: 5,
    touch: true,
    asNavFor: '.field-media-image #gallery-slider'
  });
  $('.field-media-image #gallery-slider').flexslider({
    selector: "ul.slides > li",
     animation: "slide",
     controlNav: false,
     directionNav: true,
     animationLoop: false,
     slideshow: false,
     smoothHeight: true,
     //itemWidth: 634,
     touch: true,
     sync: ".field-media-image #gallery-thumb"
  });
}

function initCalloutBlocksSlider(){
  if($('#callout-slider').get(0)){
    if($('#callout-slider div.flexslider ul.slides > li').length > 4){
      var active=0;
      var count = 0;
      var count_elements=$('#callout-slider div.flexslider ul.slides > li').length;
      $('#callout-slider .flexslider').flexslider({
        selector: "ul.slides > li",
        animation: "slide",
        animationLoop: true,
        slideshow: false,
        itemWidth: 284,
        itemMargin: 35,
        move:1,
        touch: true,
        maxItems: 15,
        startAt:1,
        start: function(slider) {
          slider.stop();
          var active = slider.currentSlide;
          $('#callout-slider div.flexslider ul.slides>li').removeClass('active');
          $('#callout-slider div.flexslider ul.slides>li').eq(active).addClass('active');
          $('#callout-slider div.flexslider ul.slides>li').eq(active+1).addClass('active');
          $('#callout-slider div.flexslider ul.slides>li').eq(active+2).addClass('active');
          $(".flexslider ul.slides > li").css({
            'display': 'block'
          });
          $('#callout-slider').css('opacity', '1');
        },
        before : function(slider){
          var active = slider.currentSlide;
          var direction = slider.direction;
          if (direction == 'next'){
            active++;
            if(active>count_elements-3){
              active=0
            }
          }
          else{
            active--;
            if(active==-1){
              active=count_elements-3;
            }
          }
          $('#callout-slider div.flexslider ul.slides>li').removeClass('active');
          $('#callout-slider div.flexslider ul.slides>li').eq(active).addClass('active');
          $('#callout-slider div.flexslider ul.slides>li').eq(active+1).addClass('active');
          $('#callout-slider div.flexslider ul.slides>li').eq(active+2).addClass('active');
        },
      });
    }
    else{
      $('#callout-slider .flexslider').flexslider({
        selector: "ul.slides > li",
        animation: "slide",
        animationLoop: false,
        slideshow: false,
        itemWidth: 284,
        itemMargin: 35,
        move:1,
        touch: true,
        maxItems: 15,
        startAt:0,
        start: function (slider) {
          $(".flexslider ul.slides > li").css({
            'display': 'block'
          });
          $('#callout-slider').css('opacity', '1');
        }
        }).addClass('no-slide');
    }
  }
}

function breadItemCounter() {
  $('.breadcrumb-dropdown').each(function(){
    if ($(">li", this).length <= 4) {
        $(this).addClass("small-bc-dropdown");
    }
  });
}
function mapDropdown(){
  // Toggle showing the Amenities dropdown on small screen view.
  $('.mobile .floors-menu .item2 a').click(function(){
    $(this).parent().toggleClass('hover');
    $('.mobile .floors-menu .item2 .wrapper').toggleClass('hover');
  });
  $('.mobile .floors-menu .amenitie .title').click(function(){
    $('.mobile .floors-menu .item2').removeClass('hover');
    $('.mobile .floors-menu .item2 .wrapper').removeClass('hover');
  });
  // Toggle showing the Floor Dropdown on small screen view
  $('.mobile .floors-menu .item1 a').click(function(){
    $('.mobile .floors-menu ul li, .mobile .floors-menu .item2 .wrapper, .mobile .floors-menu .item1 .floors').removeClass('hover');
    $('.mobile .floors-menu .item1 .floors').toggleClass('hover');
  });
  $('.mobile .floors-menu .floors li a').click(function(){
    $('.mobile .floors-menu .floors').removeClass('hover');
  });
}


function initMasonry(){
  if($('#masonry').get(0)){
    var container = document.querySelector('#masonry');
    //var tileWidth = document.querySelector('#masonry .tile');

    $('#masonry').imagesLoaded().always( function( instance ) {
      $('#masonry').css('opacity', '1');
      $('#masonry').masonry({
        itemSelector: '.m-block',
        gutter: 35,
        columnWidth: container.querySelector('.small-tile')
        //columnWidth: 290
      });
    });
  }
}

function parallax(){
  var scrollPos = jQuery(this).scrollTop();
  var windowScroll = $(window).scrollTop();

  $('#hero .image.parallax img').css({
    '-webkit-transform': 'translateY('+(scrollPos/2.5)+'px)',
    '-moz-transform': 'translateY('+(scrollPos/2.5)+'px)',
    '-ms-transform': 'translateY('+(scrollPos/2.5)+'px)',
    'transform': 'translateY('+(scrollPos/2.5)+'px)'
  });

  $('#hero-slideshow.parallax .field-exhibit-hero-image, #hero-slideshow.parallax .field-hero-slideshow').css({
    '-webkit-transform': 'translateY('+(windowScroll * 0.175)+'px)',
    '-moz-transform': 'translateY('+(windowScroll * 0.175)+'px)',
    '-ms-transform': 'translateY('+(windowScroll * 0.175)+'px)',
    'transform': 'translateY('+(windowScroll * 0.175)+'px)'
  });
}

function initImageLoaded() {
  $('#hero, #hero-slideshow').imagesLoaded().done( function( instance ) {
    $('#hero, #hero-slideshow').find('#load-holder').remove();
    $('#hero, #hero-slideshow').addClass('loaded');
    setTimeout(function(){
      $('.hero-heading, .carousel-overlay').addClass('show');
    }, 300);
  });
  $('.gallery-block, .single-img, .person-side-img, .circle-img').imagesLoaded().done( function( instance ) {
    $('.gallery-block, .single-img, .person-side-img').find('img').css('opacity', '1');
    $('.circle-img').css('opacity', '1');
  });

}

function inputDefaultValues() {
  $('#footer-top form label').inFieldLabels();
	$('#content form:not(.webform-client-form) label').inFieldLabels();
  $('#footer-top #cc_signup_form_1 input:not(.form-submit)').click(function () {
    $(this).parents('div.form-item').find('input, select, textarea').focus();
    return false;
  });

  //custom newsletter sign up form
  function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }

  $('#footer-top #cc_signup_form_custom .form-submit, #content #cc_signup_form_custom .form-submit').on('click', function() {
    var $form = $(this).parents('form');
    var $email = $form.find('.form-text');
    var email_value = $email.val();
    if(email_value != '' && validateEmail(email_value)) {
       newWin=window.open('','myWin',' height=610, width=660,innerheight=610, innerwidth=660, location=1, locationbar=1, resizable=1, scrollbars=1, status=1, statusbar=1, toolbar=1');
      $form.attr('target', 'myWin');
      $form.attr('action', 'https://ui.constantcontact.com/d.jsp');
    }
    else {
      $email.addClass('error');
      return false;
    }
  });

}


function blockHeight() {
  var researchBlockHeight = $('#hours-content .container').height();
  if ($(window).width() < 768) {
    $('.block-movie-showtimes').css({
      'height': 'auto'
    });
  } else {
    $('.block-movie-showtimes').css({
      'height': researchBlockHeight + 'px'
    });
  }
}

function initTableMark() {
  $('* td:contains("&circle&")').each(function(){
    $(this).addClass('circle');
  });
  //Add odd class to each tr because IE doesn't support :nth-child()
  if($('.tile-body, .basic-body').get(0)){
    $('tbody tr').each(function(){
      if ($(this).index()%2<1) {
        $(this).addClass('odd');
      }
    });
  }
}

/**************************************************
  Window Load
**************************************************/
$(window).load(function() {
  initHomeSlide();
  initMasonry();
  initHeroSlider();
  initCalloutBlocksSlider();
  initTableMark();
  blockHeight();
	initSearchHeight();
  initgallerySlider();
});

/**************************************************
  Document Ready
**************************************************/

$(document).ready(function () {
  initCalendarSlider();
  //textShowHide();
  toggleBelow();


  //If we are in Internet Explorer version 9 or below
  if (IE != -1 && IE != 10) {
    isIE = true;
  }

  //If the browser is not Internet Explorer
  if (!isIE) {
    //Set up event listeners tied to media queries
    mq.addEventListener('webkitTransitionEnd', deviceCheck, true);
    mq.addEventListener('MSTransitionEnd', deviceCheck, true);
    mq.addEventListener('oTransitionEnd', deviceCheck, true);
    mq.addEventListener('transitionend', deviceCheck, true);
  }

  if (jQuery.browser.mozilla == true) {
    html.addClass('firefox');
  }
  initImageLoaded();
  deviceCheck();
  sameHeight();
  smoothScroll();
  breadItemCounter();
  mobileBread();
  inputDefaultValues();
  initFeaturedEventsCounter();
  initPdfTracking();
});


function initEventCalendar(context){
  if($('body').hasClass('page-calendar')){
    var $exposedForm = $('#views-exposed-form-calendar-page');
    var $startDate = $exposedForm.find("#edit-field-date-time-value-min-date");
    var $endDate = $exposedForm.find("#edit-field-date-time-value-max-date");
    var $checkboxCategories = $exposedForm.find("#edit-field-event-categories-tid-wrapper input[type=checkbox]");
    var $submitButton = $exposedForm.find("#edit-submit-calendar");

    var currentDate = new Date();
    var lastDay = new Date(currentDate.getFullYear(),currentDate.getMonth() +1,0).getDate();
    var minDate = new Date();
    minDate.setDate(1);

    $exposedForm.once('filter-calendar', function(){
      $startDate.datepicker({
        dateFormat: "M-d-yy",
        minDate: minDate,
        onSelect: function(date) {
          $endDate.val(date);
          var dateObj = $(this).datepicker( "getDate" );
          $submitButton.trigger('click');
        }
      });
      $endDate.val($.datepicker.formatDate('M', currentDate) + '-' + lastDay + '-' + currentDate.getFullYear());

      $checkboxCategories.on('change', function(){
        $submitButton.trigger('click');
      });
    });

    $('#events-nav').once('nav-calendar',function(){
      $('#events-nav', context).on('click', 'span', function(event) {
        var minDate = $(this).attr('data-min-date');
        var maxDate = $(this).attr('data-max-date');
        $startDate.datepicker('setDate', minDate);
        $endDate.val(maxDate);
        $submitButton.trigger('click');
      });
    });
  }
}

function initFeaturedEventsCounter(){
  var slides=$('#gallery-slider ul.slides li').length;
  $('#gallery-slider ul.slides li').each(function(i){
    $(this).find('.counter').html('<span>'+(i+1)+'</span> of <span>'+slides+'</span>');
  });
}

/**************************************************
  Window Smartresize
**************************************************/

$(window).smartresize(function () {
  initMasonry();
  initImageLoaded();
  blockHeight();
});

/**************************************************
    Window Scroll
**************************************************/

$(window).scroll(function(e){
  parallax();
});

/**************************************************
  Drupal Behaviors
**************************************************/

function thingsPosition(context){

  var $img = $('.results-image li.item', context);
  var xcenter = 100, // x offset
      ycenter = 100, // y offset
      // 270 degrees is actually the top of the circle
      start = 270 * Math.PI/180,
      // Item Selector
      spacing = 2 * Math.PI / $img.length,
      imgCount = $img.length;

  // Take the total Number of images and position them in a circle
  $img.each(function () {
    // change the radius if there is more than 5 items
    if ($img.length > 4){
      var r = 140;
    }
    else {
      var r = 125;
    }
    $(this)
    .data('pos', start)
    .css({
        top: Math.floor(ycenter + (r * Math.sin(start))),
        left: Math.floor(xcenter + (r * Math.cos(start)))
    });
    start += spacing;
  });
  return false;
}

function thingsHover(context){
    $('.results-title li.item', context).hover(function() {
      $('.results-image li.item', context).eq($(this).index()).addClass('hover');
    }, function() {
      $('.results-image li.item', context).eq($(this).index()).removeClass('hover');
    });

    $('.results-image li.item', context).hover(function() {
      $('.results-title li.item', context).eq($(this).index()).addClass('hover');
    }, function() {
      $('.results-title li.item', context).eq($(this).index()).removeClass('hover');
    });
}
function thingsOnScroll(context) {
  if($('#thingstodo-section').get(0)){
    tiles = $('.results-image li.item, .results-title li.item', context).fadeTo(0, 0);
    $(window).on('scroll', function() {
        tiles.each(function(i) {
            a = $(this).offset().top + $(this).height();
            b = $(window).scrollTop() + $(window).height();
            if (a < b)
              $(this).fadeTo(100,1).clearQueue();
        });
    });
  }
}

function initCalendarSlider(){
  $('.page-calendar ul.carousel.slides li').show();
  $('body.page-calendar .item-list').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false,
    itemWidth: 634,
    move:1,
    startAt:0,
  });
}


function initSearchHeight(){
	if($('#google-cse-results').get(0)){
		var search_height=$('#google-cse-results iframe').attr('height');
		$('#google-cse-results iframe').css('height',search_height-300);
	}
}

Drupal.behaviors.franklin2_behavior = {
  attach: function (context, settings) {
    initImageLoaded();
    initEventCalendar(context);
		if (typeof(init) == "undefined") {
			flag=0;
		}
		init = true;

    /* Check if images are loading in the interactive map page when ajax loads*/
    $('#interactive-map-section', context).ajaxSuccess(function(){
      $('#interactive-map-section', context).imagesLoaded().done( function( instance ) {
        $('#interactive-map-section', context).find('img').css('opacity', '1');
      });
    });

    $('#thingstodo-section', context).imagesLoaded( function() {
      $('#thingstodo-section', context).find('img').css('opacity', '1');
    });

    $('.circle-img').imagesLoaded().done( function( instance ) {
      $('.circle-img').css('opacity', '1');
    });

    /* Homepage - "Things to Do and See" block*/
    thingsHover();
    resetStyles();

		$('#thingstodo-section .form-item.form-type-radio .option').on('click',function(){
			flag=1;
		});

	    $('#thingstodo-section', context).ajaxStart(function(){
				if(flag==1){
		      $('.results-title', context).css('opacity', 1).fadeTo(300, 0);
		      if (device == 'mobile'){}else{
			       $('.results-image li.item', context).each(function(i) {
			         $(this).stop().delay( i * (2 * $('.results-image li.item', context).length)).animate({
			           top: '+=550',
			           opacity: '0'
			         }, 600);
			       });
					}
	      }
	    });
	    $('#thingstodo-section', context).ajaxSuccess(function(){
				if(flag==1){
		      $('#thingstodo-section', context).imagesLoaded().done( function( instance ) {
		        $('#thingstodo-section', context).find('img').css('opacity', '1');
		      });
		      if (device == 'mobile'){}else{
		        $('.results-image li.item', context).each(function(i) {
		            $(this)
		            .css({ 'top': '+=550'})
		            .delay( i * (4 * $('.results-image li.item', context).length))
		            .animate({'top': '-=550', opacity: '1'}, 600);
		        });
		      }
		      $('.results-title', context).css('opacity', 0).delay(600).fadeTo(300, 1.0);
					flag=0;
				}
	    });
  }
};

Drupal.behaviors.initColorboxPlainStyle = {
  attach: function (context, settings) {
    $(document).bind('cbox_complete', function () {
      // Make all the controls invisible.
      $('#cboxCurrent, #cboxSlideshow', context).addClass('element-invisible');
      // Replace "Close" with "×" and show.
      $('#cboxClose', context).html('\327').addClass('cbox-close-plain');
      // Hide empty title.
      if ($('#cboxTitle:empty', context).length == true) {
        $('#cboxTitle', context).hide();
      }
      $('#cboxLoadedContent', context).css('overflow', 'visible');
      $('#cboxLoadedContent', context).bind('mouseover', function () {
        $('#cboxClose', context).animate({opacity: 1}, {queue: false, duration: "fast"});
        if ($('#cboxTitle:empty', context).length == false) {
          $('#cboxTitle', context).slideDown();
        }
      });
      $('#cboxOverlay', context).bind('mouseover', function () {
        $('#cboxClose', context).animate({opacity: 0}, {queue: false, duration: "fast"});
        if ($('#cboxTitle:empty', context).length == false) {
          $('#cboxTitle', context).slideUp();
        }
      });
    });
    $(document).bind('cbox_closed', function () {
      $('#cboxClose', context).removeClass('cbox-close-plain');
    });
  }
};

function initPdfTracking() {
  if($('#content .button-download').get(0)) {
    var pdfs = {
      'discovery%20camp-brochure_0.pdf': {'conversion_id': '1034721454', 'conversion_label': 'AJCuCLTH4QkQrrGy7QM'},
      'Discovery-Camp-summer-registration.pdf': {'conversion_id': '1034721454', 'conversion_label': 'SP-1CKzI4QkQrrGy7QM'}
    };
    $('#content .button-download').each(function(index, item) {
      var $link = $(item);
      var href = $link.attr('href');
      for (pdf in pdfs) {
        var pos = href.indexOf(pdf);
        if(pos != -1) {
          var pdf_params = pdfs[pdf];
          //init link
          $link.click(function() {
            trackConv(pdf_params.conversion_id, pdf_params.conversion_label);
          });
        }
      }
    });
  }
}

function trackConv(google_conversion_id, google_conversion_label) {
  var image = new Image(1,1);
  image.src = "//www.googleadservices.com/pagead/conversion/"+google_conversion_id+"/?label="+google_conversion_label+"&amp;guid=ON&amp;script=0";
}

// Open modal window
// Drupal.behaviors.popupModal = {
//   attach: function(context, settings) {
//     $(".atcb-link", context).click(function () {
//       if(!Cookies.get("atcShown")) {
//         $.colorbox({
//           inline:true,
//           href:"#atcMessage",
//           width:"50%",
//           open:true,
//           title:""
//         });
//         Cookies.set("atcShown", true);
//       }
//     });
//   }
// }

})(jQuery, Drupal, this, this.document);
