import Ember from 'ember';

var HomeDraggableItemView = Ember.View.extend({
  templateName: 'homes/home_draggable_item',
  classNames: [
    'drag-item',
    'ui',
    'grid'
  ],
  attributeBindings: [ 'data-id' ],
  'data-id': (function() {
    return this.get('content.id');
  }
  ).property(),
  isEditing: false,
  actions: {
    editHome(home) {
      this.parentView.send('editHome', home);
    }
  }
});

export default HomeDraggableItemView
