`import DS from 'ember-data'`

ObjectTransform = DS.Transform.extend
  deserialize: (serialized) ->
    if Em.isNone(serialized) then {} else serialized

  serialize: (deserialized) ->
    if Em.isNone(deserialized) then {} else deserialized

`export default ObjectTransform`
