import Ember from 'ember';

export default Ember.Route.extend({
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
