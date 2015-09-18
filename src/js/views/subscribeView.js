const subscribeViewTemplateEl = document.getElementById('subscribe-window-template');

const SubscribeView = Backbone.NativeView.extend({
    template: _.template(subscribeViewTemplateEl.innerHTML)
});

export default SubscribeView;