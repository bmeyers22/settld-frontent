import Ember from 'ember';
import Transaction from 'web/models/transaction';
import Job from 'web/models/job';

export default Ember.Component.extend({
  classNames: ['event'],
  classType: (function() {
    var model;
    model = this.get('item');
    if (model instanceof Transaction) {
      return 'transaction';
    } else if (model instanceof Job) {
      return 'job';
    } else {
      return '';
    }
  }).property(),
  iconType: (function() {
    var base, classType;
    classType = this.get('classType');
    base = 'icon ';
    return base + (classType === 'transaction' ? 'dollar' : classType === 'job' ? 'briefcase' : '');
  }).property('classType'),
  displayName: (function() {
    var isMe;
    isMe = this.get('item.user') === this.get('targetObject.session.authUser');
    if (isMe) {
      return 'You';
    } else {
      return this.get('item.user.name');
    }
  }).property('item.user'),
  actionName: (function() {
    var classType;
    classType = this.get('classType');
    if (classType === 'transaction') {
      return 'bought';
    } else if (classType === 'job') {
      return 'performed';
    } else {
      return '';
    }
  }).property(),
  payableInvoice: (function() {
    var base1;
    return typeof (base1 = this.get('item')).getOpenInvoice === "function" ? base1.getOpenInvoice(this.get('user')) : void 0;
  }).property(),
  actions: {
    openInvoiceAction: function(invoice) {
      return this.sendAction('openInvoiceAction', this.get('item'));
    }
  }
});
