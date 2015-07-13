import Ember from 'ember';

var LogoutRoute = Ember.Route.extend({beforeModel: function(transition) {
  console.log(transition);
  window.location = '/users/sign_out';
  return;
}}
);

export default LogoutRoute
