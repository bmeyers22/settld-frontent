import Ember from 'ember';

var HomesEditRoute = Ember.Route.extend({model: function(params) {
  return this.store.find('home', params.id);
}}
);

export default HomesEditRoute
