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
    transaction: 'transactions/actions-menu'
  },
  actions: {
    addInvoiceToPayments(invoice) {
      $('.payments-bar').sidebar('show');
      this.get('controller.invoices').add(invoice);
    },
    removeInvoiceFromPayments(invoice) {
      this.get('controller.invoices').remove(invoice);
    },
    togglePaymentsBar() {
      $('.payments-bar').sidebar('toggle');
    },
    closeActionBar() {
      $('.global-action-bar').sidebar('hide');
      return this.disconnectOutlet({
        outlet: 'actionsBar'
      });
    },
    openActionBar(model) {
      $('.global-action-bar').sidebar('show');
      this.render(this.get('actionBarMap')[model.constructor.modelName], {
        into: 'index',
        outlet: 'actionsBar',
        model: model,
        controller: 'actionsMenu'
      });
    },
    toggleUserBar() {
      return Ember.run(function() {
        return $('.user-bar').sidebar('show');
      });
    }
  }
});
