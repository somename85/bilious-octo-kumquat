const Webinar = Backbone.Model.extend({
    defaults: {
        participants: [],
        date: new Date().setHours(18),
        durationInMilliseconds: 1000 * 60 * 60,
        name: 'Default name.',
        description: 'Default description.',
        location: 'Default location.'
    },

    _parse_class_name: 'webinar',

    subscribe(participant) {
        this.save('participants', this.get('participants').concat(participant))
    }
});

export default Webinar;