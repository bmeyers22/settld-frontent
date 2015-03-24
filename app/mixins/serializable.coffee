`import ember from 'ember'`

Serializable = Ember.Mixin.create(serialize: ->
  result = {}
  for key of $.extend(true, {}, this)
    # Skip these
    if key == 'isInstance' or key == 'isDestroyed' or key == 'isDestroying' or key == 'concatenatedProperties' or typeof @[key] == 'function'
      continue
    result[key] = @[key]
  result
)

`export default Serializable`
