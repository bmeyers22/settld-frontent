import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [
    'drag-item',
    'ui',
    'grid'
  ],
  attributeBindings: [ 'data-id' ],
  'data-id': Ember.computed(function() {
    return this.get('content.id');
  }),
  isEditing: false,
  actions: {
    editHome(home) {
      this.parentView.send('editHome', home);
    }
  }
});
