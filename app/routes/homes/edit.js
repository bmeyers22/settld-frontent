import Ember from 'ember';

var HomesEditRoute = Ember.Route.extend({model(params) {
  return this.store.find('home', params.id);
}}
);

export default HomesEditRoute
