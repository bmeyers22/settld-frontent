import Ember from 'ember';
import DS from 'ember-data';

var ArrayTransform = DS.Transform.extend({
  deserialize(serialized) {
    if (Ember.isNone(serialized)) { return []; } else { return serialized; }
  },

  serialize(deserialized) {
    if (Ember.isNone(deserialized)) { return []; } else { return deserialized; }
  }
});

export default ArrayTransform
