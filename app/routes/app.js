import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      invoices: new Set()
    }
  },
  actionBarMap: {
    transaction: 'transactions/actions-menu'
  },
  actions: {
    paymentComplete(invoices) {
      this.get('currentModel.invoices').clear();
      return this.store.pushPayload({
        invoices: invoices
      });
    },
    addInvoiceToPayments(invoice) {
      $('.payments-bar').sidebar('show');
      this.get('currentModel.invoices').add(invoice);
    },
    removeInvoiceFromPayments(invoice) {
      this.get('currentModel.invoices').delete(invoice);
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
        into: 'app',
        outlet: 'actionsBar',
        model: model,
        controller: 'actionsMenu'
      });
    }
  }
});
