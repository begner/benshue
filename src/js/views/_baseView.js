var ViewAbstract = function () {
    this.initialited = false;
    this.$viewContainer = null;
};

ViewAbstract.prototype.setViewContainer = function($viewContainer) {
    this.$viewContainer = $viewContainer;
    return this;
};

ViewAbstract.prototype.getViewContainer = function() {
    return this.$viewContainer;
};


ViewAbstract.prototype.setController = function(controller) {
    this.controller = controller;
    return this;
};

ViewAbstract.prototype.getController = function() {
    return this.controller;
};


ViewAbstract.prototype.setInitialized = function(state) {
    this.initialited = state;
    return this;
};

ViewAbstract.prototype.getInitialized = function() {
    return this.initialited;
};



/**
 * Called, when contructed
 */
ViewAbstract.prototype.onInit = function() {
    console.log('INIT');
};

/**
 * called when view is open
 */
ViewAbstract.prototype.onOpen = function() {
    console.log('OPENED');
};

/**
 * called when view is closed
 */
ViewAbstract.prototype.onClose = function() {
    console.log('CLOSED');
};




console.log('ViewAbstract', ViewAbstract);

