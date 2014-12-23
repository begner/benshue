var UILights = function (hue /* Hue */) {

    this.selectedLampName = null;
    this.lights = [];
    this.hue = hue;

    this.setLights = function(allLights) {
        this.lights = allLights;
    };

    this.getSelectedLamp = function() {
        return this.selectedLampIDX;
    };

    this.initialize = function() {
        this.bindEvents();
        this.drawUI();

    };

    this.drawUI = function() {
        $.each(this.lights, function(k, light /* HueLight */) {
            var $currentState = ('<div class="curLightState" data-lightname="'+light.getName()+'" data-lightindex="'+light.getIndex()+'" style="background-color: #000;">' +
                '<i class=" fa fa-lightbulb-o" title="'+light.getName()+'"></i>'+
                '</div>');

            $('body').append($currentState);
            $(window).trigger('hue-change', light);
        });
    };

    this.bindEvents = function() {
        var that = this;

        $(window).on('hue-change', function(event, light /* HueLight */) {
            var name = light.getName();
            var color = light.getCurrentColorAsRGB();
            var $curObject = $('.curLightState[data-lightname="'+name+'"]');
            if (light.getOn()) {
                $curObject.css('opacity', 1);
                $curObject.css('background-color', 'rgb('+color.r+','+color.g+','+color.b+')');
                }
            else {
                $curObject.css('background-color', 'black');
                $curObject.css('opacity', 0.2);
                }
           console.log('hue-change', name, color);
        });

        $(window).on('ui-color-change', function(event, rgb) {
            console.log('ui-color-change', event, rgb);
            console.log(that.selectedLampName);
            if (that.selectedLampName) {
                var light /* HueLight */ = that.hue.getLightByName(that.selectedLampName);
                console.log(light);
                light.setColorRGB(rgb.r, rgb.g, rgb.b);
            }
        })

        $(document).on('click', '.curLightState', function(event) {
            console.log('CLICK!');
            that.selectedLampName = $(this).data('lightname');
            $('.curLightState').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
        });
    };

    return this;
};