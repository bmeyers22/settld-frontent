import Ember from 'ember';

export default Ember.Component.extend({
    currentSession: Ember.inject.service(),
    classNames: ['ui', 'horizontal', 'top', 'fixed', 'inverted', 'icon', 'main', 'menu', 'user-top-bar'],
    configured: Ember.computed('currentSession.userSettings.isUserConfigured', 'currentSession.userSettings.isGroupConfigured', function () {
        return !!(this.get('currentSession.userSettings.isUserConfigured') && this.get('currentSession.userSettings.isGroupConfigured'));
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
