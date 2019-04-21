/*
 *  stickyElements 2017
 *  Under MIT License
 */
;
(function($, window, document, undefined) {

    "use strict";

    var pluginName = "stickyElements",
        defaults = {
            top: 20,
            container: false,
            zIndex: 'inherit'
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function() {
            var self = this;
            this.el = $(this.element);

            this.el.wrapAll("<div class='sticky-elements' />");
            this.el.wrapAll("<div class='sticky-elements-in' />");

            this.stickyInner = this.el.parent();
            this.sticky = this.stickyInner.parent();
            this.container = this.sticky.parent();

            this.top = this.settings.top;
            this.zIndex = this.settings.zIndex;

            if (this.settings.container) {
                this.container = $(this.settings.container);
            }

            this.setPos();

            $(window).scroll(function() {
                self.setPos();
            });

            $(window).resize(function() {
                self.setPos();
            });

        },
        setPos: function() {
            this.scrollTopValue = $(window).scrollTop();
            this.containerHeight = this.container.height();
            this.stickyWidth = this.sticky.width();
            this.stickyInner.css("width", this.stickyWidth + "px");

            this.stickyInnerHeight = this.stickyInner.height();
            this.marginTop = (this.containerHeight - this.stickyInnerHeight - (this.sticky.offset().top - this.container.offset().top));

            this.topValue = this.sticky.offset().top - this.top;
            this.bottomValue = this.container.offset().top + this.containerHeight - this.top - this.stickyInnerHeight;

            if (this.scrollTopValue >= this.topValue && this.scrollTopValue <= this.bottomValue) {
                this.stickyInner.addClass('is-affixed');
                this.stickyInner.css("zIndex", this.zIndex);
                this.sticky.css('height', this.stickyInnerHeight + 'px');

                if (this.scrollTopValue <= this.bottomValue) {
                    this.stickyInner.css('top', this.top + 'px');
                }
            } else {
                this.stickyInner.removeClass('is-affixed');
                this.stickyInner.css("zIndex", 'inherit');
                this.sticky.css('height', 'auto');
                this.stickyInner.css('top', this.marginTop + 'px');

                if (this.scrollTopValue <= this.topValue) {
                    this.stickyInner.css('top', 0);
                }
            }
        }
    });

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
