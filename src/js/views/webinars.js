import WebinarView from './webinar';
import Webinars from '../collections/webinars'

const WebinarsView = Backbone.NativeView.extend({
    el: document.getElementById('webinars-schedule'),

    list: document.getElementById('webinars-list'),


    initialize() {
        this.webinars = new Webinars();

        this.listenTo(this.webinars, 'reset', this.showWebinars);
        this.listenTo(this.webinars, 'showSubscribeView', this.remove);

        this.webinars.fetch({ reset: true });
    },

    showWebinars() {
        this.list.innerHTML = '';
        this.webinars.each(this.showWebinar, this);
    },

    showWebinar(webinar) {
        const view = new WebinarView({model: webinar});
        this.list.appendChild(view.render().el);
    }
});

export default WebinarsView;