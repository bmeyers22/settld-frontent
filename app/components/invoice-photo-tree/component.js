import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  classNames: ['invoice-photo-tree'],
  myContribution: Ember.computed('invoices.[]', function () {
      return this.get('transaction.cost') - _.reduce(this.get('invoices'), (a, b) => {
          return a.data.get('amount') + b.data.get('amount');
      })
  })
});
