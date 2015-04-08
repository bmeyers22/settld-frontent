`import Ember from 'ember'`
`import Item from './draggable-item'`

HomeDraggableCollectionView = Ember.CollectionView.extend
  classNames: [
    'ui'
    'grid'
    'draggable'
    'sortable'
  ]
  itemViewClass: Item
  didInsertElement: ->
    self = this
    @$().sortable
      revert: true
      axis: 'y'
      handle: '.move-column'
      cursor: 'move'
      update: (event, ui) ->
        id = $('#' + self.$().sortable('toArray')[0]).data('id')
        self.send 'setDefaultHome', id
        return
    # $("#draggable").draggable({
    #     connectToSortable: "#sortable",
    #     helper: "clone",
    #     revert: "invalid"
    # });
    @$().disableSelection()
    return

`export default HomeDraggableCollectionView`