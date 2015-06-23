import DeferredQueue from 'core/defer/DeferredQueue';
import Backbone from 'backbone';

import React from 'react';
import View from 'core/react/ReactView';
import Component from './highlights/HighlightsView.jsx!';

var Application = Marionette.Application.extend({
    bootstrap: [],

    initialize() {
        this.$body  = $(document.body);
        this.ctx = di.createContext();

        // initialize region/s
        this.addRegions({"main": "body"});
        this.prestart();
    },

    prestart() {
        console.log('Module: Bootstrap - Start');
        var queue = new DeferredQueue(this.bootstrap),
            that  = this;
        queue.init().then(function() {
            console.log('Module: Bootstrap - Complete');
            that.start();
        });
    },

    onStart() {
        console.log('App: Start');
        this.ctx.initialize();

		var module, collection = this.mockCollection(),
			Comp = React.createFactory(Component);

		module = App.module('Module', Module);
		module.regionName = 'main';
		module.options = { component: Comp, data: { collection: collection }};
		module.view = View;
		module.start();

		// then startup the routers
		Backbone.history.start({pushState: true, root: ''});
    },

    stop() {
        Backbone.history.stop();
    },

	mockCollection() {
		var models = _.times(12, function(n) {
			return new Backbone.Model({
				id: n,
				date: "Today",
				time: "10:30",
				homeTeam: "Middlesbrough",
				homePrice: "1.3",
				drawTeam: "Draw",
				drawPrice: "2.4",
				awayTeam: "Manchester United",
				awayPrice: "1.1",
				numMarkets: "+34"
			});
		});
		return new Backbone.Collection(models);
	}
});


/**
 * View module implementation
 * @type {void|Object}
 */
var Module = Marionette.Module.extend({
    startWithParent: false,
    regionName: '',
    view: null,

    onStart() {
        console.log("Module: started");

        // attach the view
        if (this.view && this.regionName) {
            this.app[this.regionName].show(new this.view(this.options));
        }
    },
});


// exports singleton instance
let inst = new Application();
window.App = inst;
window.ctx = inst.ctx;
export default inst;
