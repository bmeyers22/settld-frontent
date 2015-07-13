import Ember from 'ember';

var MissingRoute = Ember.Route.extend({redirect: function(param) {
  console.log('No Route for given URL found. Will transition to Index Route instead.');
  this.transitionTo('application');
  return;
}}
);

export default MissingRoute
