`import Ember from 'ember'`
`import DS from 'ember-data'`

ArrayTransform = DS.Transform.extend
  deserialize: (serialized) ->
    if Ember.isNone(serialized) then [] else serialized

  serialize: (deserialized) ->
    if Ember.isNone(deserialized) then [] else deserialized

`export default ArrayTransform`
