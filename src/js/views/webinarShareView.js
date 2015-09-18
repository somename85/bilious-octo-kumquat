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
        let jsonModel = this.model.toJSON();
        jsonModel.addToGoogleCalendarUrl = this.createUrlForGoogleCalendar(jsonModel);

        this.el.innerHTML = this.template(jsonModel);
        return this;
    },

    createUrlForGoogleCalendar(jsonModel) {
        const dates         = this.createDatesForGoogleCalendar(jsonModel.date, jsonModel.durationInMilliseconds);

        const name          = this.replaceSpacesWithPluses(jsonModel.name);
        const description   = this.replaceSpacesWithPluses(jsonModel.description);
        const location      = this.replaceSpacesWithPluses(jsonModel.location);

        return `https://www.google.com/calendar/render?action=TEMPLATE` +
            `&text=${name}` +
            `&dates=${dates.start}/${dates.end}` +
            `&details=${description}` +
            `&location=${location}` +
            `&sf=true&output=xml`;
    },

    replaceSpacesWithPluses(string) {
        return string.split(' ').join('+');
    },

    createDatesForGoogleCalendar(parseDateObj, millisecondsDuration) {
        let start = moment(parseDateObj.iso).utc().format('GGGGMMDD[T]HHmmss[Z]');

        let end = new Date(parseDateObj.iso);
        end.setMilliseconds(end.getMilliseconds() + millisecondsDuration);
        end = moment(end).utc().format('GGGGMMDD[T]HHmmss[Z]');

        return {
            start,
            end
        }
    }
});

export default ShareView;