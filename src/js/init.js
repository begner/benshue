$(document).ready(function() {

    var controller = new Controller();
    $(window).trigger('controller-loaded', controller);
    controller.start();

});
