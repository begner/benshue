var ViewInitInstall = function() {};
ViewInitInstall.prototype = Object.create(ViewAbstract.prototype);

ViewInitInstall.prototype.onInit = function() {
    var that = this;
    this.getViewContainer().find('form').on('submit', function(event) {
        event.preventDefault();
        var data = {
            hueAdress: $(this).find('input[name="hueAdress"]').val(),
            username: that.generateUsername()
        }

        that.getController().saveLocalStorage(data);
        that.getController().start();

    });
};

ViewInitInstall.prototype.generateUsername = function() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var value = "";
    for (var i = 0; i < 15; i++) {
        value += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return value;
};


ViewInitInstall.prototype.onClose = function() {
    console.log('Overwrite Close');
};


$(window).on('controller-loaded', function(event, controller) {

    controller.addView('init_install', ViewInitInstall);
});