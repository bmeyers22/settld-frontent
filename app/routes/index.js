import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel(transition) {
    this._super(transition);
    if (!this.session.get('isAuthenticated')) {
      transition.abort();
      this.transitionTo('login');
    } else if (!this.session.get('userSettings.isUserConfigured')) {
      transition.abort();
      this.transitionTo('getstarted');
    }
  },
  actionBarMap: {
    transaction: 'transactions/actionsMenu'
  },
  actions: {
    closeActionBar: function() {
      $('.global-action-bar').sidebar('hide');
      return this.disconnectOutlet({
        outlet: 'actionBar'
      });
    },
    openActionBar: function(model) {
      $('.global-action-bar').sidebar('show');
      this.render(this.get('actionBarMap')[model.constructor.typeKey], {
        into: 'index',
        outlet: 'actionBar',
        model: model
      });
    },
    toggleUserBar: function() {
      return Ember.run(function() {
        return $('.user-bar').sidebar('show');
      });
    }
  }
});
