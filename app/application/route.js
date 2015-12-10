import Ember from 'ember';

export default Ember.Route.extend({
    pubSub: Ember.inject.service(),
    init() {
        this.get('pubSub').subscribe('flashMessage', (params) => {
            this.get('currentModel').setProperties(params);
        })
    },
    model() {
        return Ember.Object.extend({
            flashMessages: [],
            flashMessageType: 'error',
            flashMessageDuration: 3000
        }).create();
    },
    actions: {
        invalidateSession() {
            this.get('session').close().then(() => {
                this.transitionTo('login');
            });
        },
        back: function() {
            history.back();
        },
        openLink: function(url) {
            window.open(url, '_system');
        },
        accessDenied: function() {
            this.transitionTo('login');
        }
    }
});
