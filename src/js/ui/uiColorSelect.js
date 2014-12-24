var UIColorSelect = function ($container /* jquery */) {

    this.$colorInput = null;
    this.$container = $container;

    this.initialize = function() {
        this.drawUI();
        this.initMinicolors();
        this.bindEvents();
    };

    this.drawUI = function() {
        this.$colorInput = $('<input type="hidden" id="color-input" value="">');
        this.$container.append(this.$colorInput);
    };


    this.initMinicolors = function() {
        var that = this;
        this.$colorInput.minicolors({
            control: 'wheel',
            change: function(hex, opacity) {
                var rgb = that.$colorInput.minicolors('rgbObject');
                $(window).trigger('ui-color-change', rgb);
            }
        });
    }

    this.bindEvents = function() {
    };

    return this;
};