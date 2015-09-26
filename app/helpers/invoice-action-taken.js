import Ember from 'ember';

export default Ember.Helper.helper( function (params, options) {
  let invoice = params[0],
    actionTaken = invoice.get('paid') || invoice.get('paymentPending') || invoice.get('paymentRejected');

  return actionTaken;
});
