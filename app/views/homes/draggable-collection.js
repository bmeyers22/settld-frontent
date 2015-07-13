import Ember from 'ember';
import Item from './draggable-item';

var HomeDraggableCollectionView = Ember.CollectionView.extend({
  classNames: [
    'ui',
    'grid',
    'draggable',
    'sortable'
  ],
  itemViewClass: Item,
  didInsertElement: function() {
    var self = this;
    this.$().sortable({
      revert: true,
      axis: 'y',
      handle: '.move-column',
      cursor: 'move',
      update: function(event, ui) {
        var id = $('#' + self.$().sortable('toArray')[0]).data('id');
        self.send('setDefaultHome', id);
        return;
      }
    });
    // $("#draggable").draggable({
    //     connectToSortable: "#sortable",
    //     helper: "clone",
    //     revert: "invalid"
    // });
    this.$().disableSelection();
    return;
  }
});

export default HomeDraggableCollectionView