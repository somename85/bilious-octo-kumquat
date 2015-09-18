const subscribeViewTemplateEl = document.getElementById('subscribe-window-template');

const SubscribeView = Backbone.NativeView.extend({
    template: _.template(subscribeViewTemplateEl.innerHTML),

    className: 'subscribe-window',

    tagName: 'section',

    events: {
        'click #subscribe-window_subscribe-btn': 'addParticipant'
    },

    initialize() {
        this.model.bind('destroy', this.remove);
    },

    getFirstName() {
        if (!this._fistNameInput) {
            this._fistNameInput = document.querySelector('.' + this.className + ' input[name="first-name"]');
        }

        return this._fistNameInput.value;
    },

    getLastName() {
        if (!this._lastNameInput) {
            this._lastNameInput = document.querySelector('.' + this.className + ' input[name="last-name"]');
        }

        return this._lastNameInput.value;
    },

    getEmail() {
        if (!this._emailInput) {
            this._emailInput = document.querySelector('.' + this.className + ' input[name="email"]');
        }

        return this._emailInput.value;
    },

    getPhone() {
        if (!this._phoneInput) {
            this._phoneInput = document.querySelector('.' + this.className + ' input[name="phone"]');
        }

        return this._phoneInput.value;
    },

    render() {
        let jsonModel = this.model.toJSON();
        jsonModel.date = this.setTimeZoneToCLT(jsonModel.date);
        jsonModel.date = this.formatDate(jsonModel.date);

        this.el.innerHTML = this.template(jsonModel);
        return this;
    },

    formatDate(momentjsObj) {
        return momentjsObj.format('MMMM Do [at] HH[h]mm z');
    },

    setTimeZoneToCLT(parseDateObj) {
        return moment(parseDateObj.iso).tz('America/Santiago');
    },

    addParticipant() {
        const participant = {
            firstName:  this.getFirstName(),
            lastName:   this.getLastName(),
            email:      this.getEmail(),
            phone:      this.getPhone()
        };

        this.model.subscribe(participant);
    }
});

export default SubscribeView;