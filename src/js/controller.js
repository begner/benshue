var Controller = function () {

    this.hue = null;
    this.config = {hueAdress: null, username: null};
    this.views = [];
    this.currentView = null;

    this.start = function() {
        var that = this;
        // hide all views...
        $('section.view').hide();

        this.showView('init_tryconnect');
        if (!this.readLocalStorage()) {
            this.showView('init_install');
        }
        else {
            this.showView('init_tryconnect');
            this.hue = new Hue()
                .setBridgeAdress(that.config.hueAdress)
                .setUsername(that.config.username)
                .setOnAuthorizationNeeded(function() { that.showView('init_authorize'); })
                .setOnConnect(function() { that.startApp(); });

            window.setTimeout(function() {
               that.hue.initialize();
            }, 50);
        }
    };

    this.readLocalStorage = function() {
        var config = null;
        try {
            config = JSON.parse(window.localStorage.getItem('benhue_config'));
        }
        catch(e) {

        }

        console.log('localstorage', config, typeof(config));
        if (config && typeof(config) === 'object') {
            if (config.hueAdress && config.username) {
                this.config = config;
                return true;
            }
        }
        return false;
    };

    this.getHue = function() {
        console.log(this.hue);
        return this.hue;
    }

    this.saveLocalStorage = function(config) {
        this.config = config;
        window.localStorage.setItem('benhue_config', JSON.stringify(this.config));
        return true;
    };

    this.determineFromHash = function(oldViewName) {
        var viewName = oldViewName;
        var hash = window.location.hash.toString().substr(1);
        if (hash !== '' && $('section.view[id="'+hash+'"]').length > 0) {
            viewName = hash;
        }
        return viewName;
    };

    this.startApp = function() {
        var that = this;

        console.log('app started...', this);


        var viewName = 'lamps';
        viewName = this.determineFromHash(viewName);
        this.showView(viewName);

        // hashchange event...
        $(window).bind('hashchange', function () {
            var viewName = that.determineFromHash(null);
            if (viewName) {
                that.showView(viewName);
            }
        });

    };

    this.addView = function(viewName, view) {
        console.log('add view '+viewName);
        var view = new view()
            .setViewContainer($('section.view[id="'+viewName+'"]'))
            .setController(this);

        this.views[viewName] = view;
    };


    this.hideView = function(view, afterHideCallback) {
        view.getViewContainer().stop().hide( 'clip', {}, 500, function() {
            view.onClose();
            if (typeof(afterHideCallback) === 'function') {
                afterHideCallback();
            }
        });
    };

    this.setNav = function(viewName) {
        $('ul.navbar-nav').find('li').removeClass('active');
        $('ul.navbar-nav').find('li a[href$="#'+viewName+'"]').parents('li:first').addClass('active');
    };

    this.showView = function(viewName) {
        var that = this;

        console.log('show view '+viewName);
        if (this.currentView) {
            this.hideView(this.currentView);
        }

        if (this.views[viewName]) {
            this.currentView = this.views[viewName];
            if (!this.currentView.getInitialized()) {
                this.currentView.onInit();
                this.currentView.setInitialized(true);
            }
        }
        else {
            this.currentView = new ViewAbstract()
                .setViewContainer($('section.view[id="'+viewName+'"]'))
                .setController(this);
        }

        this.setNav(viewName);
        this.currentView.getViewContainer().stop().hide().show( 'blind', {}, 500, function() {
            that.currentView.onOpen();
        });

    }


    return this;
};