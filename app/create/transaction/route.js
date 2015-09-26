import Ember from 'ember';
import Enums from 'web/enums';

export default Ember.Route.extend({
  categories: Enums.TransactionCategories,
  actions: {
    setTitle(title) {
      this.set('currentModel.transaction.title', title);
      this.transitionTo('create.transaction.submit');
    },
    setCost(cost) {
      this.set('currentModel.transaction.cost', cost);
      this.transitionTo('create.transaction.title');
    },
    toggleSplit(val) {
      this.set('currentModel.transaction.split', !this.get('currentModel.transaction.split'));
    },
    complete(obj) {
      let self = this;
      return this.save(this.get('currentModel.transaction')).then(function () {
        self.transitionTo('dashboard');
      });
    },
    itemSelected(item) {
      this.set('currentModel.transaction.category', item.value);
      this.transitionTo('create.transaction.title');
    }
  },
  model() {
    return {
      transaction: this._$modelDefaults.getModelType( "transaction", {
        user: this.session.get('authUser'),
        home: this.session.get('currentHome')
      }),
      categories: this.get('categories')
    }
  },
  save(obj) {
    var copy = this.store.createRecord('transaction', obj);
    return copy.save();
  }
});
