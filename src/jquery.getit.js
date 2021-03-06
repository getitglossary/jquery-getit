// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "getit",
		    defaults = {
				    glossary: "getitglossary.org",
				    title: "Click to view the GET-IT Glossary definition of this term",
				    linkTitle: "View the full definition at {{glossary}} &rarr;",
				    hideNotFound: false,
				    notFound: "Definition not found. It may have been removed or updated. Please contact the site administrator.",
				    titleNotFound: "Term not found",
		    };

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.options = $.extend( {}, defaults, options );
				
				// replace  {{glossary}} with the specified glossary
				this.options.linkTitle = this.options.linkTitle.replace( "{{glossary}}", this.options.glossary );
				
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
			init: function () {
					// Place initialization logic here
					// You already have access to the DOM element and
					// the options via the instance, e.g. this.element
					// and this.settings
					// you can add more functions like the one below and
					// call them like the example bellow
					this.crawl( this.element, this.options);
			},
			crawl: function (el, options) {
				// some logic
				$("cite").each( function( i ){
				        if ( $( this ).data( "processed" ) ){
                      return false;
                    }
					    
					// create lookup friendly version of the term
                    var term = $(this).data("term");
                    if( undefined  === term ){
                        term = $(this).text();
                    }
                    
                    // replace spaces
                    term.replace(/\s/g, "+" );
                    
                    // Load term definition
                    $(this).addClass( "getit-definition" );
                    $(this).prop( "title", options.title );
                    $(this).data( "getit-link", "<a href=\"http://" + options.glossary + "/term/" + term + "\" target=\"_blank\">" + options.linkTitle + "</a>" );
                    $(this).data( "tooltip", i );
                    
                 
                    $.ajax({
                        dataType: "json",
                        url: "http://" + options.glossary + "/v1/terms/" + term,
                        context: $(this)
                    }).done(function( json ) {
                        var definition;
                        var notFound = false;
                        
                       // set definition
                       if( json[0] === undefined ){
                           definition = options.notFound;
                           term = options.titleNotFound;
                           notFound = true,
                           $(this).data( "getitLink", "" );
                           if( options.hideNotFound ){
                               $(this).replaceWith( $(this).text() );
                           }
                        } else {
                           definition = json[0].definition;
                        }
                        
                        // post-process definition to link to linked terms
                        	var pattern = /(\[)([\w\s,\'+-]*)(\|)([\w\s,\'+-]*)(\])/g;
                        var pattern_alt = /(\[)([\w\s,\']*)(\])/g;
	
                        	// replace with bold terms
                        var replacement = "<strong>$2</strong>";
                        	
                        	definition = definition.replace( pattern, replacement );
                        	definition = definition.replace( pattern_alt, replacement );
                        	
                        	if( !notFound || !options.hideNotFound ){
                            // Make DIV and append to page 
                            var $tooltip = $( "<div class=\"getit-tooltip\" data-tooltip=\"" + i + "\"><h2>" + term + "</h2><p>" + definition + "</p><p>" + $(this).data( "getitLink" ) + "</p><div class=\"getit-arrow\"></div></div>" ).appendTo( "body" );
        
                            // Position right away, so first appearance is smooth
                            var linkPosition = $(this).offset();
                            
                            $tooltip.css({
                                top: linkPosition.top - $tooltip.outerHeight() - 13,
                                left: linkPosition.left - ($tooltip.width()/2),
                            });
                            
                            if( json[0] === undefined ){
                                $tooltip.addClass( "getit-notfound" );
                            }
                        }
                    });
                    
                    // stop this script from firing multiple times.
                    $(this).data( "processed", true );
                     
                    $(this).on("click",function() {
                        var $tooltip = $("div[data-tooltip=" + $(this).data("tooltip") + "]");
                        var time = $.now().toString().substr(5);
                            
                        // Reposition tooltip, in case of page movement e.g. screen resize                        
                        var linkPosition = $(this).offset();
                        
                        // minor adjustment if the tooltip is going to fall off the screen
                        if(linkPosition.left - ($tooltip.width()/2) <= 0){ 
                            linkPosition.left = ($tooltip.width()/2); 
                        }
                        
                        $tooltip.css({
                          top: linkPosition.top - $tooltip.outerHeight() - 13,
                          left: linkPosition.left - ($tooltip.width()/2),
                          zIndex: time,
                        });
                        
                        // Add class handles animation through CSS
                        $tooltip.addClass("active");
                        
                        // Record a 'hit' against the glossary lookups
                        $.get({
                            url: "http://" + options.glossary + "/v1/hit/" + term,
                        });
                    });
                	});
			}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );

/*
* Additional script to instantiate the popover effect. Feel free to extract this into a separate file if needed.
*/
(function($) {
    $(document).ready(function() {
     
        $(document).keyup(function(e) {
            if (e.keyCode === 27) { 
                // Remove all classes
              $(".getit-tooltip").each( function(){
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
          if(e.target.nodeName === "CITE"){
               return;
            }
              
            $(".getit-tooltip").each( function(){
                if($(this).hasClass("active")){
                    $(this).addClass("out");
                    var $this = $(this);
                    setTimeout( function() {
                        $this.removeClass("active").removeClass("out");
                    }, 300 );
                }
            });
        });
        
    });
})(jQuery);
