import Ember from 'ember';
import Enums from 'web/enums';
import formatMoney from 'accounting/format-money';
import unformat from 'accounting/unformat';

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
    let self = this;
    return {
      transaction: this._$modelDefaults.getModelType( "transaction", {
        user: this.session.get('authUser'),
        home: this.session.get('currentHome')
      }),
      categories: this.get('categories'),
      currencyValue: Ember.computed('currentModel.transaction.cost', {
        get(key) {
          let val = self.get('currentModel.transaction.cost');
          if (!val) {
            return val;
          } else {
            return formatMoney(val);
          }
        },
        set(key, value) {
          let val = value ? unformat(value) : value
          self.set('currentModel.transaction.cost', val);
          return formatMoney(value);
        }
      })
    }
  },
  save(obj) {
    var copy = this.store.createRecord('transaction', obj);
    return copy.save();
  }
});
