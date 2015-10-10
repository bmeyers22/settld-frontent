import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    invalidateSession() {
      this.get("session").close();
    },
    back: function() {
      history.back();
    },
    openLink: function(url) {
      window.open(url, '_system');
    }
  }
});
