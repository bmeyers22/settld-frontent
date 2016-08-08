import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return this.store.find('home', params.id);
    },
    actions: {
        homeUpdated: function (home) {
            this.transitionTo('homes');
        },
        homeUpdateCancelled: function (home) {
            this.transitionTo('homes');
        }
    }
});
