
import Ember from 'ember'
import DS from 'ember-data'
import Enums from 'web/enums'


var Transaction = DS.Model.extend({
  invoices: DS.hasMany("invoice", async: false}),
  user: DS.belongsTo('user'),
  home: DS.belongsTo('home'),
  cost: DS.attr('number'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  category: DS.attr('number'),
  categoryName: (function() {
    return Enums.TransactionCategories[this.get('category')];
  }
  ).property('category'),
  date: DS.attr('date', {defaultValue: function() {
    return new Date();
  }}
  ),
  fuzzyDate: (function() {
    return moment(this.get('date')).fromNow();
  }
  ).property('date'),
  split: DS.attr('boolean'),
  points: DS.attr('number'),
  getOpenInvoice: function(user) {
    return this.get('invoices').find((inv, index, arr) => {
      return user.get('id') === inv.get('payerId');
    });
  }
});

export default Transaction
