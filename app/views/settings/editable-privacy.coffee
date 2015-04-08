`import SettingsEditableSectionView from './editable-section'`

SettingsEditablePrivacyView = SettingsEditableSectionView.extend(actions: saveEdit: (user) ->
  @get('controller').session.get('userSettings').save()
  return
)

`export default SettingsEditablePrivacyView`