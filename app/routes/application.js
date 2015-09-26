import Ember from 'ember';

export default Ember.Route.extend({
  sessionService: Ember.inject.service('session'),
  actions: {
    invalidateSession() {
      this.get('sessionService').invalidateSession(this.get('session'));
    }
  }
});
