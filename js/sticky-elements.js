/*
 *  stickyElements 2017
 *  Under MIT License
 */
;( function( $, window, document, undefined ) {

  "use strict";

    var pluginName = "stickyElements",
      defaults = {
        top: 20,
        container: false
      };

    function Plugin ( element, options ) {
      this.element = element;
      this.settings = $.extend( {}, defaults, options );
      this._defaults = defaults;
      this._name = pluginName;
      this.init();
    }

    $.extend( Plugin.prototype, {
      init: function() {
        var self = this;
        this.el = $(this.element);

        this.el.wrapAll("<div class='sticky-elements' />");
        this.el.wrapAll("<div class='sticky-elements-in' />");

        this.stickyInner = this.el.parent();
        this.sticky = this.stickyInner.parent();
        this.container = this.sticky.parent();

        this.top = this.settings.top;

        if(this.settings.container){
          this.container = $(this.settings.container);
        }

        this.setPos();

        $(window).scroll(function(){
            self.setPos();
        });

        $(window).resize(function(){
            self.setPos();
        });

      },
      setPos: function(){
        this.pos = $(window).scrollTop();
        this.containerHeight = this.container.height();
        this.width = this.sticky.width();
        this.height = this.stickyInner.height();

        this.stickyInner.css("width", this.width + "px");

        var topValue = this.sticky.offset().top - this.top;
        var bottomValue = this.sticky.offset().top + this.containerHeight - this.height - this.top;

        if (this.pos >= topValue && this.pos <= bottomValue) {
            this.stickyInner.addClass('is-affixed');

            if(this.pos <= bottomValue){
                this.stickyInner.css('top', this.top + 'px');
            }
        } else {
            this.stickyInner.removeClass('is-affixed');
            this.stickyInner.css('top', (this.containerHeight - this.height) + 'px');

            if(this.pos <= topValue){
                this.stickyInner.css('top', 0);
            }
        }
      }
    });

    $.fn[ pluginName ] = function( options ) {
      return this.each( function() {
        if ( !$.data( this, "plugin_" + pluginName ) ) {
          $.data( this, "plugin_" +
            pluginName, new Plugin( this, options ) );
        }
      } );
    };

} )( jQuery, window, document );
