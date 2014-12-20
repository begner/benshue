var HueLight = function (hue, index, data) {

    this.rawdata = data;
    this.hue = hue;
    this.brightness = data.state.bri;
    this.lightIndex = index;
    this.name = data.name;

    this.setColorRGB = function(r, g, b) {
        console.log('setting color ('+r+', '+g+', '+b+') of light '+this.name);

        var color = $.colorspaces.make_color('sRGB', [r/255, g/255, b/255]).as('CIEXYZ');

        var x = color[0];
        var y = color[1];
        var z = color[2];

        var nx = x/(x+y+z);
        var ny = y/(x+y+z);

        this.setColorXYB(nx, ny, 128);
    };


    this.setColorXYB = function(x, y, b) {
        var data = {
            'on': true,
            'bri': b,
            'xy': [x, y]
        };
        console.log('setting xyb ('+data.xy[0]+', '+data.xy[1]+', '+b+') of light '+this.name);
        this.hue.api('lights/'+this.lightIndex+"/state", data);
    };

    return this;
};