import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [
    'ui',
    'grid',
    'draggable',
    'sortable'
  ],
  didInsertElement() {
    var self = this;
    this.$().sortable({
      revert: true,
      axis: 'y',
      handle: '.move-column',
      cursor: 'move',
      update: this.get('sortUpdateFn')
    });
    this.$().disableSelection();
    return;
  }
});
