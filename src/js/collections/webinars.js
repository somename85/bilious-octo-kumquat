import Webinar from '../models/webinar';

const Webinars = Backbone.Collection.extend({
    model: Webinar,

    _parse_class_name: 'webinar'
});

export default Webinars;