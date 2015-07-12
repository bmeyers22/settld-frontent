
import Ember from 'ember'
;
var AppRoute;

AppRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if (this.session.get('authUser') == null) {
      transition.abort();
      return this.transitionTo('login');
    } else if (!this.session.get('userSettings.isUserConfigured')) {
      transition.abort();
      return this.transitionTo('getstarted');
    } else {
      if (/^app/.test(transition.targetName)) {
        return this.transitionTo('group', this.session.get('authUser.homes').indexOf(this.session.get('currentHome')));
      }
    }
  },
  model: function() {
    return this.session;
  },
  actions: {
    toggleGroupsBar: function() {
      return Ember.run(function() {
        return $('.groups-bar').sidebar('toggle');
      });
    },
    openInvoiceAction: function(txn) {
      this.controllerFor('invoice-action').addTransaction(txn);
      return this.render('invoice-action', {
        into: 'app',
        outlet: 'invoice-action',
        controller: 'invoice-action'
      });
    },
    closeInvoiceAction: function() {
      return this.disconnectOutlet({
        outlet: 'invoice-action',
        parentView: 'app'
      });
    }
  }
});

export default AppRoute;
