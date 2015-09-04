import Ember from 'ember';

export default Ember.Route.extend({
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
        into: 'app',
        outlet: 'actionsBar',
        model: model,
        controller: 'actionsMenu'
      });
    },
    toggleUserBar() {
      Ember.run(function() {
        return $('.user-bar').sidebar('show');
      });
    }
  }
});
