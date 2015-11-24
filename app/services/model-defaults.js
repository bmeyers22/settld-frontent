import Ember from 'ember';
var ModelDefaults, copyFn, createDefaultsObject, defaults, getDefaults;

defaults = function() {
  return {
    transaction: {
      user: null,
      home: null,
      cost: null,
      title: "",
      description: null,
      category: null,
      date: new Date(),
      split: false,
      contributors: [],
      points: null
    },
    job: {
      user: null,
      home: null,
      title: null,
      description: null,
      date: new Date().getTime(),
      points: null
    }
  };
};

getDefaults = function() {
  return defaults();
};

copyFn = function(defaults) {
  return function() {
    return this.getProperties(Object.keys(defaults));
  };
};

createDefaultsObject = function(defaults, properties) {
  var attrs, obj;
  attrs = $.extend(true, {}, defaults, properties);
  attrs.copy = copyFn(defaults);
  obj = Ember.Object.extend(Ember.Copyable, attrs);
  return obj.create();
};

ModelDefaults = Ember.Service.extend({
  name: "_$modelDefaults",
  availableIn: ['controllers', 'routes'],
  getDefaults: getDefaults,
  getModelType(type, properties) {
    if (properties == null) {
      properties = {};
    }
    return createDefaultsObject(getDefaults()[type], properties);
  }
});

export default ModelDefaults;
