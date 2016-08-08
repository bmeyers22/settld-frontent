import Ember from 'ember';


export default Ember.Route.extend({
    model(params) {
        return Ember.Object.extend({
            name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            roommateCount: '',
            rentPerMonth: '',
            password: '',
            passwordConfirmation: ''
        }).create();
    },
    actions: {
        cancelCreate(home) {
            this.transitionTo('getstarted');
        },
        saveHome(home) {
            let settings = this.get('currentSession.userSettings'),
            self = this;
            settings.set('isGroupConfigured', true);
            settings.set('defaultHome', home.get('id'));
            settings.save().then( function (settings) {
                self.transitionTo('app');
            });
            this.set('currentSession.currentHome', home);
            this.set('currentSession.CURRENT_HOME_ID', home.get('id'));

        }
    }
});
