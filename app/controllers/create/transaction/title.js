import Ember from 'ember';
import Enums from 'web/enums';

var TransactionsNewController = Ember.Controller.extend({
  categories: Enums.TransactionCategories,
  actions: {
    setTitle(title) {
      this.set('model.title', title);
      this.transitionTo('create.transaction.submit');
    }
  }
});

export default TransactionsNewController
