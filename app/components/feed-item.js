import Ember from 'ember';
import Transaction from 'web/models/transaction';
import Job from 'web/models/job';

export default Ember.Component.extend({
  classNames: ['event'],
  transactionsService: Ember.inject.service('transactions'),
  click() {
    this.sendAction('openActionBar', this.get('item'));
  },
  classType: Ember.computed(function() {
    var model;
    model = this.get('item');
    if (model instanceof Transaction) {
      return 'transaction';
    } else if (model instanceof Job) {
      return 'job';
    } else {
      return '';
    }
  }),
  iconType: Ember.computed('classType', function() {
    var base, classType;
    classType = this.get('classType');
    base = 'icon ';
    return base + (classType === 'transaction' ? 'dollar' : classType === 'job' ? 'briefcase' : '');
  }),
  displayName: Ember.computed('item.user', function() {
    var isMe;
    isMe = this.get('item.user') === this.get('targetObject.session.authUser');
    if (isMe) {
      return 'You';
    } else {
      return this.get('item.user.firstName');
    }
  }),
  actionName: Ember.computed(function() {
    var classType;
    classType = this.get('classType');
    if (classType === 'transaction') {
      return 'bought';
    } else if (classType === 'job') {
      return 'performed';
    } else {
      return '';
    }
  }),
  pendingInvoice: Ember.computed('item.invoices.@each.paymentPending', function() {
    return this.get('transactionsService').filterInvoicesByStatus(this.get('item'), 'paymentPending', true, this.get('session.authUser.id'));
  }),
  paidInvoice: Ember.computed('item.invoices.@each.paid', function() {
    return this.get('transactionsService').filterInvoicesByStatus(this.get('item'), 'paid', true, this.get('session.authUser.id'));
  }),
  rejectedInvoice: Ember.computed('item.invoices.@each.paymentRejected', function() {
    return this.get('transactionsService').filterInvoicesByStatus(this.get('item'), 'paymentRejected', true, this.get('session.authUser.id'));
  })
});
