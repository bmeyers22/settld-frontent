`import Ember from 'ember'`

SettingsEditableSectionView = Ember.View.extend(
  classNames: [ 'editable-section' ]
  classNameBindings: [ 'isEditing:editing' ]
  isEditing: false
  copiedProps: {}
  actions:
    editSection: ->
      @set 'copiedProps', @get('content').getProperties(@get('group'))
      @set 'isEditing', true
      return
    cancelEdit: (user) ->
      user.setProperties @get('copiedProps')
      @set 'isEditing', false
      return
    saveEdit: (user) ->
      user.save()
      @set 'isEditing', false
      return
  didInsertElement: ->
    self = this
    @$('.ui.checkbox').checkbox
      onEnable: ->
        self.get('controller').session.set 'userSettings.hasPublicProfile', true
        self.get('controller').session.get('userSettings').save()
        return
      onDisable: ->
        self.get('controller').session.set 'userSettings.hasPublicProfile', false
        self.get('controller').session.get('userSettings').save()
        return
    return
)

`export default SettingsEditableSectionView`
