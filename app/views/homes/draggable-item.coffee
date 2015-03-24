`import Ember from 'ember'`

HomeDraggableItemView = Ember.View.extend
  templateName: 'homes/home_draggable_item'
  classNames: [
    'drag-item'
    'ui'
    'grid'
  ]
  attributeBindings: [ 'data-id' ]
  'data-id': (->
    @get 'content.id'
  ).property()
  isEditing: false
  actions: editHome: (home) ->
    @parentView.send 'editHome', home
    return

`export default HomeDraggableItemView`