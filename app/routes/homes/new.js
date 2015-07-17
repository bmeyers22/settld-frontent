import Ember from 'ember';

var HomesNewRoute = Ember.Route.extend({
  actions: {
    cancelCreate: function(home) {
      this.transitionTo('homes');
    },
    saveHome: function(home) {
      this.transitionTo('homes');
    }
  }
});

export default HomesNewRoute
