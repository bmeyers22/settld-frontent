import Ember from 'ember';

var Draggable = Ember.Mixin.create(
  {attributeBindings: 'draggable',
  draggable: 'true',
  dragStart(event) {
    var dataTransfer = event.originalEvent.dataTransfer;
    console.log(event);
    return;
  }}
);

export default Draggable