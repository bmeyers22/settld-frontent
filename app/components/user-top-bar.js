import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'horizontal', 'top', 'fixed', 'inverted', 'icon', 'main', 'menu', 'user-top-bar'],
  configured: Ember.computed('session.isUserConfigured', 'session.isGroupConfigured', function () {
    return !!(this.get('session.isUserConfigured') && this.get('session.isGroupConfigured'));
  }),
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
