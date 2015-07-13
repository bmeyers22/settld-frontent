import Ember from 'ember';

var initialize = function(registry, application) {
  application.inject('controller', '_$modelDefaults', 'service:modelDefaults');
  return application.inject('route', '_$modelDefaults', 'service:modelDefaults');
};

var ServicesInitializer =
  {name: 'services',
  after: 'store',
  initialize: initialize};

export {initialize}
export default ServicesInitializer
