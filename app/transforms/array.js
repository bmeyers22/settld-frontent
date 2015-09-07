import Ember from 'ember';
import DS from 'ember-data';

var ArrayTransform = DS.Transform.extend({
  deserialize(serialized) {
    if (Ember.isNone(serialized)) { []; } else { serialized; }
  },

  serialize(deserialized) {
    if (Ember.isNone(deserialized)) { []; } else { deserialized; }
  }
});

export default ArrayTransform
