import Ember from 'ember';

export default Ember.Controller.extend({
  invoices: Ember.Set.create(),
  actions: {
    paymentComplete(invoices) {
      this.set('invoices', Ember.Set.create());
      this.store.pushPayload({
        invoices: invoices
      });
      this.send('togglePaymentsBar');
    }
  }
});
