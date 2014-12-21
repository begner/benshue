$(document).ready(function() {
    console.log('App Started...');
    var hueAdress = '192.168.1.31';

    var hue = new Hue();


    var startApp = function() {

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

        var lights = hue.getAllLights();
        console.log("All Lights", lights);
        $.each(lights, function(k, light /* HueLight */) {
            var $currentState = ('<div class="curLightState" data-lightname="'+light.getName()+'" style="display:block; width:100px; height:100px; float:left; background-color: #000; border:1px solid #fff; margin:0 10px;">'+ light.getName()+'</div>');
            $('body').append($currentState);
            $(window).trigger('hue-change', light);
        });


        var specificLight = hue.getLightByName('Arbeitszimmer 1');
        console.log('Get specific light: ', specificLight);
    /*
        var animationColors = []
        for (var i = 0; i<36; i++) {
            animationColors.push(i*10);
        }

        $.each(animationColors, function(k, v) {
            window.setTimeout( function() {
                specificLight.setColorHSB(v, 100, 100);
            }, 100*k);

        });
*/




    };


    // Start the Hue stuff!
    hue
        .setBridgeAdress(hueAdress)
        .setOnConnect(startApp)
        .initialize();

    window.hue = hue; // export it to window object (console purpose)

});
