$.noConflict();
(function($) {

  /* one: location */

  /* two: dates */

  /* three: passengers */
  /* TODO:
     prevent selecting more than 6 total tickets
     error messages */

  $('#adult').after('<a class="more adult" href="#null">+</a>');
  $('#adult').before('<a class="less adult" href="#null">-</a>');

  $('#child').after('<a class="more child" href="#null">+</a>');
  $('#child').before('<a class="less child" href="#null">-</a>');

  $('#senior').after('<a class="more senior" href="#null">+</a>');
  $('#senior').before('<a class="less senior" href="#null">-</a>');

  $('.more.adult').on('click', function(e) {
    var adultValue = $('#adult').val();
    var newAdultValue = parseInt(adultValue, 10) + 1;
    $('#adult').val(newAdultValue);
    e.stopPropogation();  /* firefox error: stopPropogation not a function? */
    e.preventDefault();
  });

  $('.less.adult').on('click', function(e) {
    var adultValue = $('#adult').val();
    var newAdultValue = parseInt(adultValue, 10)-1;
    if(newAdultValue < 0) {
      newAdultValue = 0;
    }
    $('#adult').val(newAdultValue);
    e.stopPropogation();
    e.preventDefault();
  });

  $('.more.child').on('click', function(e) {
    var childValue = $('#child').val();
    var newChildValue = parseInt(childValue, 10) + 1;
    $('#child').val(newChildValue);
    e.stopPropogation();  /* firefox error: stopPropogation not a function? */
    e.preventDefault();
  });

  $('.less.child').on('click', function(e) {
    var childValue = $('#child').val();
    var newChildValue = parseInt(childValue, 10)-1;
    if(newChildValue < 0) {
      newChildValue = 0;
    }
    $('#child').val(newChildValue);
    e.stopPropogation();
    e.preventDefault();
  });

  $('.more.senior').on('click', function(e) {
    var seniorValue = $('#senior').val();
    var newSeniorValue = parseInt(seniorValue, 10) + 1;
    $('#senior').val(newSeniorValue);
    e.stopPropogation();
    e.preventDefault();
  });

  $('.less.senior').on('click', function(e) {
    var seniorValue = $('#senior').val();
    var newSeniorValue = parseInt(seniorValue, 10) - 1;
    if(newSeniorValue < 0) {
      newSeniorValue = 0;
    }
    $('#senior').val(newSeniorValue);
    e.stopPropogation();
    e.preventDefault();
  });

  /* four: departing flight */

  /* five: return flight */

  /* six: departing seats */

  /* seven: returning seats */

  /* eight: payment info */

  /* nine: review */

  /* ten: confirmation */

})(jQuery);
