import Ember from 'ember';


export default Ember.Component.extend({
  classNames: ['global-wrapper', 'pushable'],
  actions: {
    closeActionBar() {
      this.sendAction('closeActionBar');
    },
    toggleUserBar() {
      this.$('.user-bar').sidebar('show');
    },
    toggleGroupsBar() {
      this.$('.groups-bar').sidebar('toggle');
    },
    invalidateSession() {
      this.sendAction('invalidateSession');
    }
  },
  didInsertElement() {
    this.$('.groups-bar').sidebar({
      context: $('.global-wrapper')
    });
    this.$('.user-bar').sidebar({
      context: $('.global-content'),
      dimPage: false,
      defaultTransition: {
        computer: {
          top: 'push'
        },
        mobile: {
          top: 'push'
        }
      }
    });
    this.$('.global-action-bar').sidebar({
      context: $('.global-content'),
      dimPage: false,
      defaultTransition: {
        computer: {
          top: 'overlay'
        },
        mobile: {
          top: 'overlay'
        }
      }
    });
  }
});
