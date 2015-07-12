import Ember from 'ember'

var TransactionsRoute = Ember.Route.extend({setupController: function(controller, model) {
  var controllerFeed = this.controllerFor('feeds/transactions');
  return;
}}
);

export default TransactionsRoute
