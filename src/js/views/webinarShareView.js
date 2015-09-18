const shareViewTemplateEl = document.getElementById('share-window-template');

const ShareView = Backbone.NativeView.extend({
    template: _.template(shareViewTemplateEl.innerHTML),

    className: 'share-window',

    tagName: 'section',

    events: {},

    initialize() {
        this.model.bind('destroy', this.remove);
    },

    render() {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    }
});

export default ShareView;
