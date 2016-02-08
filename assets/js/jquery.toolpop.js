// IIFE to ensure safe use of $
(function( $ ) {

  // Create plugin
  $.fn.tooltips = function(el) {

    var $tooltip,
      $body = $('body'),
      $el;

    // Ensure chaining works
    return this.each(function(i, el) {

      $el = $(el).attr("data-tooltip", i);

      // Make DIV and append to page 
      var $tooltip = $('<div class="tooltip" data-tooltip="' + i + '"><h2>' + $el.data("term") + '</h2><p>' + $el.data("definition") + '</p><p>' + $el.data("getitLink") + '</p><div class="arrow"></div></div>').appendTo("body");

      // Position right away, so first appearance is smooth
      var linkPosition = $el.offset();

      $tooltip.css({
        top: linkPosition.top - $tooltip.outerHeight() - 13,
        left: linkPosition.left - ($tooltip.width()/2)
      });

      $el

      // Mouseenter
      .on("click",function() {
        $this = $(this);
        $tooltip = $("div[data-tooltip=" + $this.data("tooltip") + "]");

        // Reposition tooltip, in case of page movement e.g. screen resize                        
        var linkPosition = $this.offset();
        
        // minor adjustment if the tooltip is going to fall off the screen
        if(linkPosition.left - ($tooltip.width()/2) <= 0){ 
            linkPosition.left = ($tooltip.width()/2); 
        }
        
        $tooltip.css({
          top: linkPosition.top - $tooltip.outerHeight() - 13,
          left: linkPosition.left - ($tooltip.width()/2)
        });

        // Adding class handles animation through CSS
        $tooltip.addClass("active");

       });

      });

    }
})(jQuery);

(function($) {
  $(document).ready(function() {
     $("cite[data-term]").tooltips();
     
     $(document).keyup(function(e) {
        if (e.keyCode == 27) { 
            // Remove all classes
          $(".tooltip").each( function(){
             if($(this).hasClass("active")){
                $(this).addClass("out");
                var $this = $(this);
                setTimeout( function() {
                    $this.removeClass("active").removeClass("out");
                }, 300 );
            }
        });
     }   // escape key maps to keycode `27`
    });
           
    $(document).click(function(e) {
          if(e.target.nodeName == "A") return;
          $(".tooltip").each( function(){
             if($(this).hasClass('active')){
                $(this).addClass("out");
                var $this = $(this);
                setTimeout( function() {
                    $this.removeClass("active").removeClass("out");
                }, 300 );
            
            }
        })
    });
    
    $("#getit_terms").on( 'change', function()
    {
        term = $("#getit_terms option:selected").text();
        $("#getit_definition").html( "<h2>" + term + "</h2><em>&ldquo;" + $(this).val() + "&rdquo;</em>" + "<br/><br/><p><a href=\"http://getitglossary.org/term/" + term + "\" target=\"_getit\">View the full definition at GetitGlossary.org &rarr;</a>" );
    });
    
});
})(jQuery);
