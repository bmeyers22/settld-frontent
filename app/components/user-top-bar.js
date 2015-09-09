import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'horizontal', 'top', 'fixed', 'inverted', 'icon', 'main', 'menu', 'user-top-bar'],
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
