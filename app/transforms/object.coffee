`import Ember from 'ember'`
`import DS from 'ember-data'`

ObjectTransform = DS.Transform.extend
  deserialize: (serialized) ->
    if Ember.isNone(serialized) then {} else serialized

  serialize: (deserialized) ->
    if Ember.isNone(deserialized) then {} else deserialized

`export default ObjectTransform`
