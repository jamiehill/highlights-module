import Radio from 'backbone.radio';
import timestamp from 'core/system/NiceConsole';

import React from 'react';
import View from 'core/react/ReactView';
import Component from './highlights/HighlightsView.jsx!';

var Application = Marionette.Application.extend({

	// setup our channels
	session: Radio.channel('session'),
	socket:  Radio.channel('socket'),
	router:  Radio.channel('router'),
	bus:  	 Radio.channel('bus'),


    bootstrap: [
		//'highlights/HighlightsConfig',
		'core/system/bootstrap/DomainResolver',
		'core/system/bootstrap/MarionetteConfig',
		'core/system/bootstrap/GetSportData'
    ],


    initialize() {
		_.bindAll(this, 'start');

		window.App = this;
		window.ctx = this.ctx = di.createContext();

		// initialize src layout
		this.addRegions({"main": "body"});

		timestamp(console);
		this.prestart();
    },


	/**
	 * On start kick off the views
	 */
    onStart() {
		console.log('App: Start');
		this.ctx.initialize();

		var module = App.module('Module', Module);
		module.regionName = 'main';
		module.options = {
			component: React.createFactory(Component)
		};
		module.view = View;
		module.start();

		this.postStart();
    },

	/**
	 * Shut down applicatiopn
	 */
	onStop() {
		console.log("Backbone: history - stopped");
		Backbone.history.stop();
		Radio.reset();
	},



	/**
	 * kick the boot sequence off
	 */
	prestart() {
		console.log('App: PreStart');
		var that = this;
		System.import('core/CoreModule').then(function(inst){
			var module = App.module('Core', inst.default);
			module.boot(that.bootstrap).then(that.start);
		});
	},

	/**
	 * Startup router and history
	 */
	postStart() {
		console.log('App: PostStart');
		this.Router = appRouter.start();

		var options = {pushState: true, root: this.Urls.root || ''};
		Backbone.history.start(options);
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
