(function ($) {
  
  $('#play-button').click(function () {
      $('#play-button').not(this).siblings('.video-player').removeClass('show');
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