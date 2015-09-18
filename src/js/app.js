import WebinarsView from './views/webinars';
import parseSync from './lib/backbone.parseSync'


window.addEventListener('load', function () {
    Backbone.ajax = Backbone.NativeAjax;
    Backbone.sync = parseSync;


    new WebinarsView();
    Backbone.history.start({pushState: true})
});