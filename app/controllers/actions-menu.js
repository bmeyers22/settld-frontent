import Ember from 'ember';

export default Ember.Controller.extend({
  unpaidInvoice: function () {
    let self = this;
    return this.get('model.invoices').find( function (inv) {
      return self.get('session.authUser.id') === inv.get('payerId');
    });
  }.property('model'),
  owedInvoices: function () {
    let self = this;
    return this.get('model.invoices').filter(function (inv) {
      return inv.get('paid') === false && self.get('session.authUser.id') === inv.get('payeeId');
    });
  }.property('model')
});
