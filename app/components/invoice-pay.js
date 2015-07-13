import Ember from 'ember';

var InvoicePayComponent = Ember.Component.extend({
  classNames: ['invoice'],
  didInsertElement: function() {},
  actions:
    {close: function() {
      return this.sendAction('close');
    },
    removeTxn: function() {
      return this.sendAction('remove', txn);
    },
    sendPayment: function() {
      var invoices = this.transactions.map((txn) => {
        return txn.getOpenInvoice(this.user).get('id');
      });
      return $.post( '/api/v1/venmo/pay', {
        type: "POST",
        payment: {
          invoices: invoices,
          note: "HEY"
        },
        success(data) {
          return console.log(data);
        },
        error(data) {
          return console.log(data);
        }
      });
    },

    markPaid: function() {}}
});

export default InvoicePayComponent
