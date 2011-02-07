/*!
 * jQuery Birthday Picker: v1.1.1 - 11/16/2010
 * http://abecoffman.com/birthdaypicker
 * 
 * Copyright (c) 2010 Abe Coffman
 * Dual licensed under the MIT and GPL licenses.
 * 
 */

(function( $ ){
  
  fromIsoDate = function(txt) {
    var darr = txt.split("-");
    if (darr.length != 3)
      return null;
    // Input is iso date, but javascript expects
    // month component in range 0..11,
    // so we subtract one from the month
    darr[1] -= 1;
    return new Date(Date.UTC.apply(null, darr));
  };

  toIsoDate = function(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return "" + date.getFullYear() + "-" + ((month < 10 ? '0' : '') + month) + "-" + ((day < 10 ? '0' : '') + day);
  };
  
  // plugin variables
  var months = {
    "short": ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Des"],
    "long": ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]
  };
  
  $.fn.birthdaypicker = function( options ) {

    var settings = {
      "maxAge"            : 120,
      "futureDates"       : false,
      "maxYear"           : curYear,
      "dateFormat"        : "middleEndian",
      "monthFormat"       : "short",
      "placeholder"       : true,
      "legend"            : "",
      "updateElement"     : null
    };
    
    var curDate = new Date();
    var curYear = curDate.getFullYear();
    var curMonth = curDate.getMonth() + 1;
    var curDay = curDate.getDate();
    
    return this.each(function() {

      if (options) { $.extend(settings, options); }
      
      // Create the html picker skeleton
      var $fieldset = $("<span class='birthday-picker'></span>");
      var $year = $("<select class='birth-year' name='birth[year]'></select>");
      var $month = $("<select class='birth-month' name='birth[month]'></select>");
      var $day = $("<select class='birth-day' name='birth[day]'></select>");

      if(settings["legend"]) { $("<legend>" + settings["legend"] + "</legend>").appendTo($fieldset); }
      
      // Add the option placeholders if specified
      if(settings["placeholder"]) {
        $("<option value='0'>&Aring;r</option>").appendTo($year);
        $("<option value='0'>M&aring;ned</option>").appendTo($month);
        $("<option value='0'>Dag</option>").appendTo($day);
      }
      
      // Deal with the various Date Formats
      if(settings["dateFormat"] == "bigEndian") { $fieldset.append($year).append($month).append($day); }
      else if(settings["dateFormat"] == "littleEndian") { $fieldset.append($day).append($month).append($year); }
      else { $fieldset.append($month).append($day).append($year); }

      // Build the initial option sets
      var startYear = settings["maxYear"];
      var endYear = curYear - settings["maxAge"];
      if(settings["futureDates"] && settings["maxYear"] != curYear) {
        if (settings["maxYear"] > 1000) { startYear = settings["maxYear"]; }
        else { startYear = curYear + settings["maxYear"]; }
      }
      while(startYear >= endYear) { $("<option></option>").attr("value", startYear).text(startYear).appendTo($year); startYear--; }
      for( var j=0; j<12; j++) { $("<option></option>").attr("value", j+1).text(months[settings["monthFormat"]][j]).appendTo($month); }
      for(var k=1; k<32; k++) { $("<option></option>").attr("value", k).text(k).appendTo($day); }
      var $this = $(this);
      $this.prepend($fieldset);
      
      // Update the option sets according to options and user selections
      $fieldset.change(function(){
        var curNumMonths = parseInt($month.children(":last").val());
        var curNumDays = parseInt($day.children(":last").val());
        var dd = new Date($year.val(), $month.val(), 0);
        var actNumDays = dd.getDate();
        // Dealing with the number of days in a month
        if(curNumDays > actNumDays) { while(curNumDays > actNumDays) { $day.children(":last").remove(); curNumDays--; } }
        else if(curNumDays < actNumDays) { 
          while(curNumDays < actNumDays) {
            $("<option></option>").attr("value", curNumDays+1).text(curNumDays+1).appendTo($day); curNumDays++;
          }
        }
        
        // Dealing with future months/days in current year
        if(!settings["futureDates"] && $year.val() == curYear) {
          if(curNumMonths > curMonth) { while(curNumMonths > curMonth) { $month.children(":last").remove(); curNumMonths--; } }
          if($month.val() == curMonth) {
            if(curNumDays > curDay) { while(curNumDays > curDay) { $day.children(":last").remove(); curNumDays--; } }
          }
        }

        // Adding months back that may have been removed
        if($year.val() != curYear && curNumMonths != 12) {
          while(curNumMonths < 12) {
            $("<option></option>").attr("value", curNumMonths+1).text( months[settings["monthFormat"]][curNumMonths] ).appendTo($month);
            curNumMonths++;
          }
        }

        settings.updateElement.val($year.val() + '-' + $month.val() + '-' + $day.val());
      });

      /* Update dates on load. */
      if (settings.updateElement != null && settings.updateElement.val() != "") {
        var date = fromIsoDate(settings.updateElement.val());
        $year.val(date.getFullYear());
        $month.val(date.getMonth() + 1);
        $day.val(date.getDate());
      }

    });
  };
})( jQuery );