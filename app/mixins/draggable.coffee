`import Ember from 'ember'`

Draggable = Ember.Mixin.create(
  attributeBindings: 'draggable'
  draggable: 'true'
  dragStart: (event) ->
    dataTransfer = event.originalEvent.dataTransfer
    console.log event
    return
)

`export default Draggable`