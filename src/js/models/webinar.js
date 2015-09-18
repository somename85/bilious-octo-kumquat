const Webinar = Backbone.Model.extend({
    defaults: {
        participants: [],
        date: new Date().setHours(18)
    },

    _parse_class_name: 'webinar',

    subscribe(participant) {
        this.save('participants', this.get('participants').concat(participant))
    }
});

export default Webinar;