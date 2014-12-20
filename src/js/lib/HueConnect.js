var HueConnect = function (bridgeAdress, deviceType, username) {

    this.bridgeAdress = bridgeAdress;
    this.deviceType = deviceType;
    this.username = username;

    this.getHueApiURL = function () {
        return 'http://' + this.bridgeAdress + '/api/'
    };

    this.authenticateBridge = function (successCallback, linkMissingCallback) {
        var that = this;
        var data = null;

        // try to get data...
        try {
            data = this.getBridgeData();
        }
        catch(e) {
            // console.log(e);
        }

        // if that wont work - authorize!
        if (!data) {
            $.ajax({
                url: this.getHueApiURL(),
                data: JSON.stringify({devicetype: this.deviceType, username: this.username}),
                type: "POST",
                success: function (responseData) {
                    console.log('authenticateBridge', responseData);
                    var response = responseData[0];

                    // press button on bridge!
                    if (response.error && response.error.type && response.error.type == 101) {
                        linkMissingCallback();
                    }
                    else {
                        // read data after auth
                        data = that.getBridgeData();
                    }
                },
                dataType: 'JSON'
            });
        }

        // if data is present... -> success!
        if (data !== null) {
            successCallback(data);
        }
    };

    this.getBridgeData = function () {
        var data = null;

        $.ajax({
            url: this.getHueApiURL() + this.username + '/',
            data: '',
            type: 'GET',
            success: function (responseData) {
                console.log('getBridgeData', responseData);

                if (responseData[0] && responseData[0].error && typeof(responseData[0].error) == 'object') {
                    throw 'HueBridge: '+responseData[0].error.type+" - "+responseData[0].error.description;
                }
                else {
                    data = responseData;
                }
            },
            dataType: 'JSON',
            async: false
        });

        return data;
    };

    this.put = function(path, sendData) {
        var data = null;

        $.ajax({
            url: this.getHueApiURL() + this.username + '/' + path,
            data: JSON.stringify(sendData),
            type: "PUT",
            success: function (responseData) {
               data = responseData;
            },
            dataType: 'JSON',
            async: false
        });

        return data;
    };

    return this;
};