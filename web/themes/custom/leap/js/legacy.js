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
}

//Function to reset any styles that may have been changed on screen resize
function resetStyles() {
  if (device == 'mobile'){
    $('body').addClass('mobile');
    $('#nav-wrapper').addClass('slide-nav');
    //$('ul.menu-lvl-1 > li.expanded').removeClass('dropdown');
    toggleMenu();
  }
  else {
    $('body').removeClass("mobile");
    $('#nav-wrapper').removeClass('slide-nav');
    //$('ul.menu-lvl-1 > li.expanded').addClass('dropdown');
    $('body').removeClass("menu-open");
    $('.menu-btn').parent().removeClass("active");
  }
}


//Create an event checker function that grabs the current value of the after pseudo class of the #mediaquery <div>
function deviceCheck() {
  if (isIE) {
    device = 'desktop';
  } else {
    device = window.getComputedStyle(mq,':after').getPropertyValue('content').replace(/'/g,"").split('"').join('');
    resetStyles();
  }
}


/**************************************************
  Document Ready
**************************************************/

$(document).ready(function () {

  If we are in Internet Explorer version 9 or below
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
  deviceCheck();
});


Drupal.behaviors.franklin2_behavior = {
  attach: function (context, settings) {
    
    resetStyles();

    
  }
};



})(jQuery, Drupal, this, this.document);

 