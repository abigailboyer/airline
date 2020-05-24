/* https://github.com/madmurphy/cookies.js (GPL3) */
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,o,n,t,r,c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""),!0},removeItem:function(e,o,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""),!0):!1},hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),o=e.length,n=0;o>n;n++)e[n]=decodeURIComponent(e[n]);return e}};"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=docCookies);

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

  $('#passengers').on('submit', function(e) {
    console.log('submitted');

  });

  /* four: departing flight */

  /* five: return flight */

  /* six: departing seats */

  /* seven: returning seats */

  /* eight: payment info */

  /* nine: review */

  /* ten: confirmation */

})(jQuery);
