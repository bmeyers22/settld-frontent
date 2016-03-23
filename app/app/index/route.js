import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('dashboard', this.get('currentSession.currentHome.id'));
  }
});
