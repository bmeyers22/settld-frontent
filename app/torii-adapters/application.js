import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

export default ToriiFirebaseAdapter.extend({
  application: Ember.inject.controller(),
  firebase: Ember.inject.service(),
  close() {
    this._super().then(() => {
      application.transitionTo('login');
    })
  }
});
