var Hue = function () {

    this.bridgeAdress = null;
    this.deviceType = "benhue";
    this.username = null;
    this.connector = null;

    this.lights = [];
    this.bridgeData = {};
    this.onAuthorizationNeeded = function() { console.log('press link button and reload!'); };
    this.onConnect = function() { console.log('connected', this.bridgeData); };

    this.setUsername = function(username) {
        this.username = username;
        return this;
    };

    this.setOnAuthorizationNeeded = function(callback) {
        this.onAuthorizationNeeded = callback;
        return this;
    }

    this.setOnConnect = function(callback) {
        this.onConnect = callback;
        return this;
    }

    this.setBridgeAdress = function (adress) {
        this.bridgeAdress = adress;
        return this;
    };

    this.api = function(path, data) {
        if (data) {
            return this.connector.put(path, data);
        }
        else {
            return this.connector.get(path);
        }
    };

    this.initialize = function() {
        var that = this;
        this.connector = new HueConnect(this.bridgeAdress, this.deviceType, this.username);
        this.connector.authenticateBridge(function(bridgeData) {
            that.readBridgeData(bridgeData);
            that.onConnect();
        }, this.onAuthorizationNeeded);
    };

    this.readBridgeData = function(bridgeData) {
        var that = this;

        if (!bridgeData) {
            bridgeData = this.connector.getBridgeData();
        }

        // create Lights :)
        $.each(bridgeData.lights, function(lightNumber, data) {
            that.lights.push(new HueLight(that, lightNumber, data));
        });
    }

    this.getAllLights = function() {
        return this.lights;
    };


    this.getLightByName = function(lightname) {
        var foundLight = null;
        $.each(this.lights, function(idx, light) {
            if (light.name == lightname) {
                foundLight = light;
                return false; // exit each
            }
        })
        return foundLight;
    }


    return this;
};