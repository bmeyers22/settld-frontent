import Ember from 'ember'
import DS from 'ember-data'

var ObjectTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    if (Ember.isNone(serialized)) { {}; } else { serialized; }
  },

  serialize: function(deserialized) {
    if (Ember.isNone(deserialized)) { {}; } else { deserialized; }
  }
});

export default ObjectTransform
