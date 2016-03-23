import Ember from 'ember';

var MissingRoute = Ember.Route.extend({redirect(param) {
  console.log('No Route for given URL found. Will transition to Index Route instead.');
  return;
}}
);

export default MissingRoute
