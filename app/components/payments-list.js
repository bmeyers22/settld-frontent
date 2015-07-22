import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['payments-list'],
  invoicesSum: function () {
    let sum = 0;
    this.get('invoices').forEach( (inv) => {
      sum += inv.get('amount');
    })
    return sum;
  }.property('invoices@each'),
  actions: {
    close() {
      return this.sendAction('close');
    },
    removeTxn() {
      return this.sendAction('remove', txn);
    },
    sendPayment() {
      var invoices = this.get('invoices').map((inv) => {
        return inv.get('id');
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

    markPaid() {}}
});
