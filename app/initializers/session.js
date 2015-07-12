import Ember from 'ember'
import Session from 'web/models/session'

// Takes two parameters: container and app
var initialize = function(registry, application) {
  application.deferReadiness();
  application.register('session:current', Session, singleton: true});
  application.inject('controller', 'session', 'session:current');
  application.inject('route', 'session', 'session:current');
  return Ember.$.getJSON("/users/current.json").then(function(current) {
    window.currentUserData = current;
    return application.advanceReadiness();
  });
};


var SessionInitializer =
  {name: 'session',
  after: 'enums',
  initialize: initialize};

export {initialize}
export default SessionInitializer
