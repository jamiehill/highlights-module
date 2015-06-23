import AppLayout from './AppLayout';
import DeferredQueue from 'core/defer/DeferredQueue';
import Backbone from 'backbone';

var Application = Marionette.Application.extend({
    bootstrap: [
        'app/AppConfig',
        'core/bootstrap/DomainResolver'
    ],


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
        var module;

        System.import(pkg.main).then(function(view) {
            module = App.module('Module', Module);
            module.regionName = 'main'
            module.view = view;
            module.start();

            // then startup the routers
            Backbone.history.start({pushState: true, root: this.Urls.root || ''});
        })
    },

    stop() {
        Backbone.history.stop();
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
            this.app[this.regionName].show(new this.view());
        }
    },
});


// exports singleton instance
let inst = new Application();
window.App = inst;
window.ctx = inst.ctx;
export default inst;
