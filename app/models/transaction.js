
import Ember from 'ember';
import DS from 'ember-data';
import Enums from 'web/enums';


var Transaction = DS.Model.extend({
  invoices: DS.hasMany('invoice', {async: false}),
  user: DS.belongsTo('user', {
    async: false
  }),
  home: DS.belongsTo('home', {
    async: false
  }),
  cost: DS.attr('number'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  category: DS.attr('number'),
  categoryName: Ember.computed('category', function() {
    return Enums.TransactionCategories[this.get('category')];
  }),
  date: DS.attr('date', { defaultValue: new Date }),
  fuzzyDate: Ember.computed('date', function() {
    return moment(this.get('date')).fromNow();
  }),
  split: DS.attr('boolean'),
  points: DS.attr('number'),
  contributors: DS.attr('array')
});

export default Transaction
