var HueLight = function (hueConnect, index, data) {

    this.rawdata = data;
    this.hueConnect = hueConnect;

    this.lightIndex = index;
    this.name = data.name;

    this.hue = data.state.hue;
    this.sat = data.state.sat;
    this.bri = data.state.bri;
    this.on = data.state.on;
    this.reachable = data.state.reachable;

    this.getName = function () {
        return this.name;
    };

    this.getIndex = function() {
        return this.lightIndex;
    };

    this.getOn = function() {
        if (!this.reachable) return false;
        return this.on;
    };

    this.getCurrentColorAsHSB = function () {
        var hsb = {h: 0, s: 0, b: 0};
        hsb.h = Math.round(this.hue / 65535 * 360);
        hsb.s = Math.round(this.sat / 255 * 100);
        hsb.b = Math.round(this.bri / 255 * 100);
        return hsb;
    };

    this.getCurrentColorAsRGB = function () {
        var hsb = this.getCurrentColorAsHSB();
        var rgb = this.hsb2rgb(hsb);
        return rgb;
    };

    this.setOn = function(on) {
        var response = this.hueConnect.api('lights/' + this.lightIndex + "/state", {'on': on});
        this.updateResponseData(response);
        $(window).trigger('hue-change', this);
    };


    this.setColorRGB = function (r, g, b) {
        console.log('Set Lamp '+this.getIndex()+' "'+this.getName()+'" to rgb('+r+','+g+','+b+')');
        var hsb = this.rgb2hsb({r: r, g: g, b: b})
        this.setColorHSB(hsb.h, hsb.s, hsb.b);
        return this;
    };

    this.setColorHSB = function (h, s, b) {
        console.log('Set Lamp '+this.getIndex()+' "'+this.getName()+'" to hsb('+h+','+s+','+b+')');
        b = this.correctBrightness(h, b, {centerHue: 150, amp: 75, width: 140});
        console.log('- correct brigtness to '+b);

        var data = {
            'on': true,
            'hue': Math.round(h / 360 * 65535),
            'bri': Math.round(b / 100 * 255),
            'sat': Math.round(s / 100 * 255)
        };

        var response = this.hueConnect.api('lights/' + this.lightIndex + "/state", data);
        this.updateResponseData(response);
        $(window).trigger('hue-change', this);
        return this;
    };

    this.updateResponseData = function (response) {
        var that = this;
        var updateVars = ['hue', 'sat', 'bri', 'on'];

        $.each(response, function (k, v) {
            if (v.success) {
                var pName = Object.keys(v.success)[0];
                var pValue = v.success[pName];
                var pNameShort = pName.split('/').pop();

                if (updateVars.indexOf(pNameShort) != -1) {
                    that[pNameShort] = pValue;
                }
            }
        });
        return this;
    };




    this.logColor = function (rgbObject) {
        var hsb = this.rgb2hsb(rgbObject);
        var color = 'rgb(' + rgbObject.r + ', ' + rgbObject.g + ', ' + rgbObject.b + ')';
        console.log('logColor', color, rgbObject, hsb);
        $('body').append('<div class="" style="display:block; width:50px; height:50px; float:left; background-color: ' + color + ';">H: ' + Math.round(hsb.h) + '<br>B: ' + Math.round(hsb.b) + '<br></div>');
    };



    this.correctBrightness = function (currentHue, currentBrigtness, damperObject) {
        var damperValue = 100;

        if (currentHue > damperObject.centerHue - damperObject.width / 2 &&
            currentHue < damperObject.centerHue + damperObject.width / 2) {

            var rest = damperObject.centerHue % damperObject.width;
            var filterOffset = rest / damperObject.width; // rest
            var offset = 360 - (filterOffset * 360);

            var position = (360 / damperObject.width * currentHue) + offset; // in grad!

            damperValue = (damperObject.amp * (Math.cos(position * Math.PI / 180) + 1) / 2);
            damperValue = 100 - damperValue;
            if (damperValue == 0) {
                damperValue = 1;
            }
        }

        currentBrigtness = currentBrigtness / 100 * damperValue;
        return currentBrigtness;
    };



    this.rgb2hsb = function (rgb) {
        var hsb = {h: 0, s: 0, b: 0};
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max !== 0 ? 255 * delta / max : 0;
        if (hsb.s !== 0) {
            if (rgb.r === max) {
                hsb.h = (rgb.g - rgb.b) / delta;
            } else if (rgb.g === max) {
                hsb.h = 2 + (rgb.b - rgb.r) / delta;
            } else {
                hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
        } else {
            hsb.h = -1;
        }
        hsb.h *= 60;
        if (hsb.h < 0) {
            hsb.h += 360;
        }
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;


        hsb.h = Math.round(hsb.h);
        hsb.s = Math.round(hsb.s);
        hsb.b = Math.round(hsb.b);
        return hsb;
    }


    this.hsb2rgb = function (hsb) {
        var rgb = {};

        var h = Math.round(hsb.h);
        var s = Math.round(hsb.s * 255 / 100);
        var v = Math.round(hsb.b * 255 / 100);
        if (s === 0) {
            rgb.r = rgb.g = rgb.b = v;
        } else {
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if (h === 360) h = 0;
            if (h < 60) {
                rgb.r = t1;
                rgb.b = t2;
                rgb.g = t2 + t3;
            }
            else if (h < 120) {
                rgb.g = t1;
                rgb.b = t2;
                rgb.r = t1 - t3;
            }
            else if (h < 180) {
                rgb.g = t1;
                rgb.r = t2;
                rgb.b = t2 + t3;
            }
            else if (h < 240) {
                rgb.b = t1;
                rgb.r = t2;
                rgb.g = t1 - t3;
            }
            else if (h < 300) {
                rgb.b = t1;
                rgb.g = t2;
                rgb.r = t2 + t3;
            }
            else if (h < 360) {
                rgb.r = t1;
                rgb.g = t2;
                rgb.b = t1 - t3;
            }
            else {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0;
            }
        }
        return {
            r: Math.round(rgb.r),
            g: Math.round(rgb.g),
            b: Math.round(rgb.b)
        };
    }


    return this;
};