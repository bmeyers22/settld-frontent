import Ember from 'ember'
import Enums from '../enums'

// Takes two parameters: container and app
var initialize = function(registry, application) {
  application.register('enums:default', Enums, instantiate: false});
  application.inject('controller', 'Enums', 'enums:default');
  return application.inject('route', 'Enums', 'enums:default');
};

var EnumsInitializer =
  {name: 'enums',
  after: 'environment',
  initialize: initialize};

export {initialize}
export default EnumsInitializer
