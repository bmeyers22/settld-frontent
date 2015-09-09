import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleUserBar() {
      this.sendAction('toggleUserBar');
    },
    toggleGroupsBar() {
      this.sendAction('toggleGroupsBar')
    },
    logout() {
      this.sendAction('logout');
    }
  }
});
