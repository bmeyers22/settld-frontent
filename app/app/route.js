import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return {
            invoices: Ember.ArrayProxy.create({ content: [] }),
            actionMenuComponent: null,
            actionMenuModel: null,
            flashMessages: [],
            flashMessageType: 'error',
            flashMessageDuration: 3000
        }
    },
    actionBarMap: {
        transaction:  {
            component: 'transactions/actions-menu'
        }
    },
    actions: {
        paymentComplete(invoices) {
            this.get('currentModel.invoices').forEach((item) => {
                if (item.get('paid')) {
                    this.send('removeInvoiceFromPayments', item);
                }
            });
            return this.store.pushPayload({
                invoices: invoices
            });
        },
        addInvoiceToPayments(invoice) {
            $('.payments-bar').sidebar('show');
            if (this.get('currentModel.invoices').contains(invoice)) {
                return;
            }
            this.get('currentModel.invoices').addObject(invoice);
        },
        removeInvoiceFromPayments(invoice) {
            this.get('currentModel.invoices').removeObject(invoice);
        },
        togglePaymentsBar() {
            $('.payments-bar').sidebar('toggle');
        },
        closeActionBar() {
            $('.global-action-bar').sidebar('hide');
            this.set('actionMenuComponent', '');
        },
        openActionBar(model) {
            this.set('currentModel.actionMenuModel', model);
            this.set('currentModel.actionMenuComponent', this.get('actionBarMap')[model.constructor.modelName].component);
            $('.global-action-bar').sidebar('show');
        }
    }
});
