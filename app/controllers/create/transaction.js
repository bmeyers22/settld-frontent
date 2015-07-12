
import Ember from 'ember'

var TransactionsNewController = Ember.Controller.extend(
  {categories: (function() {
    var cats = _.clone(this.Enums.TransactionCategories);
    return _.sortBy( _.map(cats, function(name, key) {
      return {
        key: key,
        val: name.capitalize()
      };
    }
    ), function(e) {
      return e.val[0];
    }
    );
  }
  ).property(),
  save: function(txn) {
    var copy = this.store.createRecord('transaction', txn);
    return copy.save();
  },
  actions:
    {complete: function(txn) {
      return this.save(this.get('model'));
    }}

});

export default TransactionsNewController
