$(document).ready(function() {

    console.log('App Started...');
    var hueAdress = '192.168.1.31';

    var hue = new Hue();


    var startApp = function() {

        var uiLights = new UILights(hue);
        uiLights.setLights(hue.getAllLights());
        uiLights.initialize();

        var uiColorSelect = new UIColorSelect(hue);
        uiColorSelect.initialize();

        // var specificLight = hue.getLightByName('Arbeitszimmer 1');
        // console.log('Get specific light: ', specificLight);
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
