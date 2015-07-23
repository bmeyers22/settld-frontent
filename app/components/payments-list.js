import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['payments-bar', 'ui', 'vertical', 'sidebar', 'left'],
  invoicesSum: function () {
    let sum = 0;
    this.get('invoices').forEach( (inv) => {
      sum += inv.get('amount');
    })
    return sum;
  }.property('invoices.[]'),
  didInsertElement() {
    this.$().sidebar({
      context: $('.global-wrapper'),
      dimPage: false,
      defaultTransition: {
        computer: {
          left: 'overlay'
        },
        mobile: {
          left: 'overlay'
        }
      }
    });
  },
  actions: {
    toggleBar() {
      this.sendAction('toggleBar');
    },
    removeTxn() {
      this.sendAction('remove', txn);
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
          console.log(data);
        },
        error(data) {
          console.log(data);
        }
      });
    },

    markPaid() {}}
});
