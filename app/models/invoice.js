import DS from 'ember-data';

var Invoice = DS.Model.extend({
  transaction: DS.belongsTo('transaction', {
    async: false
  }),
  payerId: DS.attr("string"),
  payeeId: DS.attr("string"),
  homeId: DS.attr("string"),
  amount: DS.attr('number'),
  note: DS.attr('string'),
  paid: DS.attr('boolean'),
  paymentDate: DS.attr("date"),
  paymentMethod: DS.attr("number"),
  paymentPending: DS.attr('boolean'),
  paymentRejected: DS.attr('boolean'),
  rejectionNote: DS.attr('string'),
  paymentConfirmedDate: DS.attr('date')
});

export default Invoice
