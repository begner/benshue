var ViewLamps = function() {};
ViewLamps.prototype = Object.create(ViewAbstract.prototype);

ViewLamps.prototype.onInit = function() {
    var uiLights = new UILights(this.getController().getHue(), this.getViewContainer());
    uiLights.setLights();
    uiLights.initialize();

    var uiColorSelect = new UIColorSelect(this.getViewContainer());
    uiColorSelect.initialize();
}


$(window).on('controller-loaded', function(event, controller) {
    controller.addView('lamps', ViewLamps);
});