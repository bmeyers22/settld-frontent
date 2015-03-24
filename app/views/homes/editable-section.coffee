`import Ember from 'ember'`

HomesEditableSectionView = Ember.View.extend(
  classNames: [ 'editable-section' ]
  classNameBindings: [ 'isEditing:editing' ]
  isEditing: false
  copiedProps: {}
  actions:
    editSection: ->
      @set 'copiedProps', @get('content').getProperties(@get('group'))
      @set 'isEditing', true
      return
    cancelEdit: (home) ->
      home.setProperties @get('copiedProps')
      @set 'isEditing', false
      return
    saveEdit: (home) ->
      home.save()
      @set 'isEditing', false
      return
    submitEdit: ->
      @$('.ui.form').form 'submit'
      return
  didInsertElement: ->
)

`export default HomesEditableSectionView`
