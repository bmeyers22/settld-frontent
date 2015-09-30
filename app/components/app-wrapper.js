import Ember from 'ember';


export default Ember.Component.extend({
  classNames: ['global-wrapper', 'pushable'],
  actions: {
    addInvoiceToPayments(invoice) {
      this.sendAction('addInvoiceToPayments', invoice);
    },
    togglePaymentsBar() {
      this.sendAction('togglePaymentsBar');
    },
    closeActionBar() {
      this.sendAction('closeActionBar');
    },
    toggleUserBar() {
      this.$('.user-bar').sidebar('toggle');
    },
    toggleGroupsBar() {
      this.$('.groups-bar').sidebar('toggle');
    },
    invalidateSession() {
      this.sendAction('invalidateSession');
    },
    paymentComplete(invoices) {
      this.sendAction('paymentComplete', invoices);
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
