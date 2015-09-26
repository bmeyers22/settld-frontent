import Ember from 'ember';
import Enums from 'web/enums';

var TransactionsNewController = Ember.Controller.extend({
  categories: Enums.TransactionCategories,
  actions: {
    itemSelected(item) {
      this.set('model.category', item.value);
      this.transitionTo('create.transaction.title');
    }
  }
});

export default TransactionsNewController
