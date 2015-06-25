import Radio from 'backbone.radio';
import AppLayout from './AppLayout';

var Application = Marionette.Application.extend({

	// setup our channels
	session: Radio.channel('session'),
	socket:  Radio.channel('socket'),
	router:  Radio.channel('router'),
	bus:  	 Radio.channel('bus'),


    bootstrap: [
		'app/js/app/AppConfig',
		'core/system/bootstrap/DomainResolver',
		'core/system/bootstrap/MarionetteConfig',
		'core/system/bootstrap/GetSportData'
    ],


    initialize() {
		_.bindAll(this, 'start');

		window.App = this;
		window.ctx = this.ctx = di.createContext();

		// initialize src layout
		this.layout = new AppLayout();
		this.layout.render();

		timestamp(console);
		this.prestart();
    },


    prestart() {
		var that = this;
		System.import('core/CoreModule').then(function(inst){
			var module = App.module('Core', inst.default);
			module.boot(that.bootstrap).then(that.start);
		});
    },


    onStart() {
		console.log('App: Start');
		this.ctx.initialize();

		// initialize and start each required module
		_.each(this.modules, function(Module, name) {
			App.module(name, Module).start();
		});

		// then startup the routers
		console.log("Backbone: history - started");
		Backbone.history.on('route', this.onRoute);
		Backbone.history.start({pushState: true, root: this.Urls.root || ''});
    },

	/**
	 * Shut down applicatiopn
	 */
	onStop() {
		console.log("Backbone: history - stopped");
		Backbone.history.stop();
	},

	/**
	 * Broadcast global route changes
	 */
		onRoute(router, name, args) {
		console.log('Router: '+name);
		App.router.trigger('route:change', name);
	}
});


/**
 * View module implementation
 * @type {void|Object}
 */
var Module = Marionette.Module.extend({
    startWithParent: false,
    regionName: '',
    viewClass: null,

    onStart() {
        console.log("Module: started");

        // attach the view
        if (this.viewClass && this.regionName) {
            this.app[this.regionName].show(new this.viewClass());
        }
    },
});


// exports singleton instance
let inst = new Application();
export default inst;
