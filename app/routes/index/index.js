import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('dashboard', this.store.peekAll('home').indexOf(this.session.get('currentHome')));
  }
});
