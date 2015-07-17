import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    toggleGroupsBar: function() {
      return Ember.run(function() {
        return $('.groups-bar').sidebar('toggle');
      });
    },
    toggleUserBar: function() {
      return Ember.run(function() {
        return $('.user-bar').sidebar('toggle');
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
