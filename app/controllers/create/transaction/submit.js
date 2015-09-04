import Ember from 'ember';
import Enums from 'web/enums';

var TransactionsNewController = Ember.Controller.extend({
  save: function(txn) {
    var copy = this.store.createRecord('transaction', txn);
    return copy.save();
  },
  actions: {
    setCost(cost) {
      this.set('model.cost', cost);
      this.transitionTo('create.transaction.title');
    },
    toggleSplit(val) {
      this.set('model.split', !this.get('model.split'));
    },
    complete: function(txn) {
      let self = this;
      return this.save(this.get('model')).then(function () {
        self.transitionTo('dashboard');
      });
    }
  }
});

export default TransactionsNewController
