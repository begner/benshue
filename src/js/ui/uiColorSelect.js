var UIColorSelect = function () {

    this.$colorInput = null;

    this.initialize = function() {
        this.drawUI();
        this.initMinicolors();
        this.bindEvents();
    };

    this.drawUI = function() {
        this.$colorInput = $('<input type="hidden" id="color-input" value="">');
        $('body').append(this.$colorInput);
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