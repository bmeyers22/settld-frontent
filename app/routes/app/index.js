import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('dashboard', this.session.get('authUser.homes').indexOf(this.session.get('currentHome')));
  }
});
