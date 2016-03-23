import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['global', 'flash-messages'],
    classNameBindings: ['typeClassName'],
    typeClassName: '',
    transitionType: 'slide down',
    timeoutHandle: null,
    didInsertElement() {
        this.$().transition();
    },
    clearTimeout() {
        Ember.run.cancel(this.get('timeoutHandle'));
        this.set('timeoutHandle', null);
    },
    showMessages: Ember.observer('messages', function () {
        let wasShowing = this.get('timeoutHandle');
        this.clearTimeout();
        this.set('typeClassName', this.get('type'));
        if (!wasShowing) {
            this.$().transition(this.get('transitionType'));
        }
        this.set('timeoutHandle', Ember.run.later(this, function () {
            this.$().transition(this.get('transitionType'));
            this.clearTimeout();
        }, this.get('duration')));
    })
});
