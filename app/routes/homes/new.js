import Ember from 'ember';

var HomesNewRoute = Ember.Route.extend({
  actions: {
    cancelCreate(home) {
      this.transitionTo('homes');
    },
    saveHome(home) {
      this.transitionTo('homes');
    }
  }
});

export default HomesNewRoute
