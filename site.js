/* https://github.com/madmurphy/cookies.js (GPL3) */
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,o,n,t,r,c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""),!0},removeItem:function(e,o,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""),!0):!1},hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),o=e.length,n=0;o>n;n++)e[n]=decodeURIComponent(e[n]);return e}};"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=docCookies);

$.noConflict();
(function($) {

  /* TODO:
     trim all input values */

  /* one: location */

  /* TODO:
     handle multi-city/one-way
     use city api to autofill and check for valid input */

  /* submit function */
  $("#location").on('submit', function(e){
      /* validation */

      /* check if empty */
      var departingLocation = $('#departingLocation').val();
      var returnLocation = $('#returnLocation').val();

      console.log(departingLocation)
      console.log(returnLocation)

      if(departingLocation && returnLocation){
        /* save cookies */
        docCookies.setItem("departingLocation", departingLocation);
        docCookies.setItem("returnLocation", returnLocation);

        /* check cookies are saved */
        console.log(docCookies.getItem("departingLocation"));
        console.log(docCookies.getItem("returnLocation"));

        /* continue to date selection */
      } else {
        e.preventDefault();

        /* remove any previous error message */
        $('.errormessage').remove();

        /* add a new error message */
        $('.locationInputs').before('<p class="errormessage">You must enter a city name.</p>');
      }
  });

  /* two: dates */

  /* three: passengers */
  /* TODO:
     prevent selecting more than 6 total tickets
     error messages
     if the quantity is already at 6, don't let them add anymore tickets with
     the +/- buttons
     add validation to make sure inputs aren't null or letters */

  /* add + and - buttons to the inputs  */
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
    e.preventDefault();
  });

  $('.less.adult').on('click', function(e) {
    var adultValue = $('#adult').val();
    var newAdultValue = parseInt(adultValue, 10)-1;
    if(newAdultValue < 0) {
      newAdultValue = 0;
    }
    $('#adult').val(newAdultValue);
    e.preventDefault();
  });

  $('.more.child').on('click', function(e) {
    var childValue = $('#child').val();
    var newChildValue = parseInt(childValue, 10) + 1;
    $('#child').val(newChildValue);
    e.preventDefault();
  });

  $('.less.child').on('click', function(e) {
    var childValue = $('#child').val();
    var newChildValue = parseInt(childValue, 10)-1;
    if(newChildValue < 0) {
      newChildValue = 0;
    }
    $('#child').val(newChildValue);
    e.preventDefault();
  });

  $('.more.senior').on('click', function(e) {
    var seniorValue = $('#senior').val();
    var newSeniorValue = parseInt(seniorValue, 10) + 1;
    $('#senior').val(newSeniorValue);
    e.preventDefault();
  });

  $('.less.senior').on('click', function(e) {
    var seniorValue = $('#senior').val();
    var newSeniorValue = parseInt(seniorValue, 10) - 1;
    if(newSeniorValue < 0) {
      newSeniorValue = 0;
    }
    $('#senior').val(newSeniorValue);
    e.preventDefault();
  });

  /* submit function */

  $('#passengers').on('submit', function(e) {
    /* form validation */

    /* check that there are less than 7 ticket
       check that there is at least one senior or adult
       then save the cookie */
    if(quantity < 7) {
      if (adult >= 1 || senior >= 1) {
        /* save cookies */

        /* translate string into number */
        var adultInput = $('#adult').val();
        var adult = parseInt(adultInput, 10);

        var childInput = $('#child').val();
        var child = parseInt(childInput, 10);

        var seniorInput = $('#senior').val();
        var senior = parseInt(seniorInput, 10);

        /* set cookies (name, value) */
        docCookies.setItem("adult", adult);
        docCookies.setItem("senior", senior);
        docCookies.setItem("child", child);

        /* check that cookies are set */
        console.log(docCookies.getItem("adult"));
        console.log(docCookies.getItem("senior"));
        console.log(docCookies.getItem("child"));

        /* count tickets and set cookie */
        var quantity = (adult + senior + child);
        console.log("total tickets: " + quantity);

        docCookies.setItem("quantity", quantity);
        console.log("cookie: " + docCookies.getItem("quantity"));

        /* continue to departing flight selection */
      } else {
        e.preventDefault();

        /* remove any previous error message */
        $('.errormessage').remove();

        /* add a new error message */
        $('.tickets').before('<p class="errormessage">You must have at least one adult or senior ticket per order.</p>');
      }

    } else {
      e.preventDefault();

      /* remove any previous error message */
      $('.errormessage').remove();

      /* add a new error message */
      $('.tickets').before('<p class="errormessage">No more than six tickets per customer.</p>');
    }
  });

  /* four: departing flight */

  $('#departingFlight').on('submit', function(e) {
    e.preventDefault();

    console.log(docCookies.getItem("quantity"));
    console.log(docCookies.getItem("adult"));
  });


  /* five: return flight */

  /* six: departing seats */

  /* seven: returning seats */

  /* eight: payment info */

  /* nine: review */

  /* ten: confirmation */

})(jQuery);
