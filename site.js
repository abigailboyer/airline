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

    /* TODO:
       make sure date is today or in the future
       add in interactive calendar
       figure out whether to save date as string or object or both   */

  /* set month and date globally so I can reuse them in the other functions */
  var month;
  var dateString;

  /* switch number to month */
  /* eventually find a better way to do this */
  function monthSwitch() {
    switch (month) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
      default:
        console.log("month switch didn't work");
        break;
    }
  }

  /* taken from stackoverflow because I couldn't have have done any better myself
     https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript  */
  function isValidDate() {
    /* check date pattern format as mm/dd/yyyy */
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      console.log("here");
      return false;
    }

    /* parse date parts to integers */
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    /* Check the ranges of month and year */
    if(year < 1000 || year > 3000 || month == 0 || month > 12) {
      console.log("here");
      return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    /* Adjust for leap years */
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }

    /* Check the range of the day */
    return day > 0 && day <= monthLength[month - 1];
  }

  /* submit dates */
  $('#dates').on('submit', function(e) {
    var departingDate = new Date($('#departingDate').val());
    var returnDate = new Date($('#returnDate').val());

    console.log(departingDate);

    /* translate date input into day month and year for ease of use */
    var departingDay = departingDate.getDate() + 1;
    var departingMonth = departingDate.getMonth() + 1;
    var departingYear = departingDate.getFullYear();

    var returnDay = returnDate.getDate() + 1;
    var returnMonth = returnDate.getMonth() + 1;
    var returnYear = returnDate.getFullYear();

    /* switch number for month */
    month = departingMonth;
    console.log("month before switch: " + month);
    monthSwitch();
    console.log("month after switch: " + month);

    /* create a string with that date */
    var departingDateString = month + ' ' + departingDay + ', ' + departingYear;
    console.log(departingDateString)

    /* also a numeric one */
    var departingDateNumber = departingMonth + '/' + departingDay + '/' + departingYear;
    console.log(departingDateNumber)

    /* save those to a cookie */
    docCookies.setItem("departingDate", departingDateString);
    console.log("departing date cookie: " + docCookies.getItem("departingDate"));

    docCookies.setItem("departingDateNumber", departingDateNumber);
    console.log("departing date cookie: " + docCookies.getItem("departingDateNumber"));

    /* repeat for return date */
    month = returnMonth;
    monthSwitch();

    var returnDateString = month + ' ' + returnDay + ', ' + returnYear;
    docCookies.setItem("returnDate", returnDateString);
    console.log("return date cookie: " + docCookies.getItem("returnDate"));

    var returnDateNumber = returnMonth + '/' + returnDay + '/' + returnYear;
    docCookies.setItem("returnDateNumber", returnDateNumber);
    console.log("return date cookie: " + docCookies.getItem("returnDateNumber"));

    /* validate */
    dateString = departingDateNumber;
    if (!isValidDate(dateString)){
      console.log("false depart");

      /* print error message */
      e.preventDefault();

      /* remove any previous error message */
      $('.errormessage').remove();

      /* add a new error message */
      $('#departingDate').before('<p class="errormessage">Please enter a departure date.</p>');

    } else {
      console.log("true depart");

      dateString = returnDateNumber;

      if(!isValidDate(dateString)){
        console.log("false return");

        /* print error message */
        e.preventDefault();

        /* remove any previous error message */
        $('.errormessage').remove();

        /* add a new error message */
        $('#returnDate').before('<p class="errormessage">Please enter a return date.</p>');

      } else {
        console.log("true return");
      }
    }

  });

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
    if (newAdultValue < 0) {
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
    if (newChildValue < 0) {
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
    if (newSeniorValue < 0) {
      newSeniorValue = 0;
    }
    $('#senior').val(newSeniorValue);
    e.preventDefault();
  });

  /* submit ticket numbers and passenger types */
  $('#passengers').on('submit', function(e) {
    /* translate string into number */
    var adultInput = $('#adult').val();
    var adult = parseInt(adultInput, 10);

    var childInput = $('#child').val();
    var child = parseInt(childInput, 10);

    var seniorInput = $('#senior').val();
    var senior = parseInt(seniorInput, 10);

    /* count tickets */
    var quantity = (adult + senior + child);
    console.log("total tickets: " + quantity);

    /* form validation */
    /* check that there are less than 7 tickets
       check that there is at least one senior or adult
       then save the cookie */

    if (quantity > 6) {
      console.log("Error: no more than 6 tickets per customer.");
      e.preventDefault();

      /* remove any previous error message */
      $('.errormessage').remove();

      /* add a new error message */
      $('.tickets').before('<p class="errormessage">No more than six tickets per customer.</p>');

    } else {
      console.log("There are less than 7 tickets.");

      if (adult >= 1 || senior >= 1) {
        console.log("There is at least one adult or senior ticket.");
        /* since everything's fine, set the cookies */

        /* set cookies (name, value) */
        docCookies.setItem("adult", adult);
        docCookies.setItem("senior", senior);
        docCookies.setItem("child", child);

        /* check that cookies are set */
        console.log(docCookies.getItem("adult"));
        console.log(docCookies.getItem("senior"));
        console.log(docCookies.getItem("child"));

        docCookies.setItem("quantity", quantity);
        console.log("quantity cookie: " + docCookies.getItem("quantity"));

      } else {
        console.log("Error: you must have at least one adult or senior.");
        e.preventDefault();

        /* remove any previous error message */
        $('.errormessage').remove();

        /* add a new error message */
        $('.tickets').before('<p class="errormessage">You must have at least one adult or senior ticket per order.</p>');
      }
    }
  });

  /* four: departing flight */

  /* insert selection into input
     erase old input and put in new one every time you click
     validate text input with regex maybe so its in the right format
     save cookie of choice
     repeat for return flight selection */

  /* <a> onclick */
  /* .searchResults a or #departingSelection a and repeat it for return? */
  /*$('.searchResults a').on('click', function(e) {
    e.preventDefault();

  });

  $('#departingFlight').on('submit', function(e) {
    e.preventDefault();
    console.log(docCookies.getItem("quantity"));


  });*/


  /* five: return flight */

  /* six: departing seats */
  /* TODO:
     add option to change ticket number selection when you select the wrong
     wrong number of seats
     figure out how to remove the item from the array once it's been deselected :) */

  var selected = [];
  var seats;

  $('#airplane a').on('click', function(e) {
    e.preventDefault();

    var quantity = docCookies.getItem("quantity");
    var selectedSeats = $('.selected').length;

    if ($(this).hasClass('unavailable')) {
      console.log("Unavailable or already selected seat.");
      return;
    } else {
      console.log("Available seat.");
    }

    if($(this).hasClass('selected')){
      $(this).toggleClass('selected');
    } else {
      /* if the number of selected seats is bigger than the total number of tickets
         minus one because the array length is always 1 higher than the ticket total */
      if (selectedSeats > (quantity - 1)) {
        console.log("too many");
        e.preventDefault();

        $('.errormessage').remove();
        $('#seatSelection').before('<p class="errormessage">You have selected too many seats.</p>');
      } else {
        /* switch from selected to unselected on cick */
        $(this).toggleClass('selected');
      }
    }
  });

  $('#departingSeats').on('submit', function(e) {
    e.preventDefault();
    selected = [];

    $('.selected').each(function() {
      var seat = $(this).attr('href').substring(1);
      if (selected.includes(seat) === false) selected.push(seat); /* so values aren't repeated */
    });

    console.log(selected);
    /* validate form */

    /* make sure enough tickets have been selected to match quantity */
  });

  /* todo: "you picked too many seats. do you need another ticket?
     and then it's just the ticket # form again" */

  /* seven: returning seats */

  /* eight: payment info */

  /* nine: review */

  /* ten: confirmation */

})(jQuery);
