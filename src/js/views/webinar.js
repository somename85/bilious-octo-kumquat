import SubscribeView from './webinarSubscribeView';

const webinarTemplateEl = document.getElementById('webinar-template');

const WebinarView = Backbone.NativeView.extend({
    template: _.template(webinarTemplateEl.innerHTML),

    tagName: 'li',

    className: 'schedule_list-i',

    events: {
        'click .schedule_subscribe-btn': 'showSubscribeWindow'
    },

    initialize() {
        this.model.bind('destroy', this.remove);
    },

    render() {
        let jsonModel = this.model.toJSON();
        jsonModel.date = this.setTimeZoneToCLT(jsonModel.date);
        jsonModel.date = this.formatDate(jsonModel.date);

        this.el.innerHTML = this.template(jsonModel);
        return this;
    },

    formatDate(momentjsObj) {
        return momentjsObj.format('dddd D MMMM - HH[h]mm z');
    },

    setTimeZoneToCLT(parseDateObj) {
        return moment(parseDateObj.iso).tz('America/Santiago');
    },

    showSubscribeWindow() {
        this.model.trigger('showSubscribeView');

        const view = new SubscribeView({model: this.model});
        document.body.appendChild(view.render().el);
    }
});

export default WebinarView;