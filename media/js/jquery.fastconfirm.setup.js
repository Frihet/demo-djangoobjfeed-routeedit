$.fastConfirmify = function() {
    var items = $('.fast-confirm:not(.fast-confirm-done)');
    items.addClass('fast-confirm-done');
    items.click(function(){
        var ques = $(this).attr('ques');
        var href = $(this).attr('href')
        $(this).fastConfirm({
                          position: "right",
                          questionText: ques,
                          onProceed: function(trigger) {
	                          var next = '_next=' + window.location;
	                          if (href.indexOf('?') < 0)
				          next = "?" + next;
				  else
				          next = "&" + next;
                                  window.location.href = href + next
                          },
                          onCancel: function(trigger) {
                          }
                     });
         return false;

    });
}
$(document).ready($.fastConfirmify);
