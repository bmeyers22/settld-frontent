import SettingsEditableSectionView from './editable-section'

var SettingsEditablePrivacyView = SettingsEditableSectionView.extend({actions: {saveEdit: function(user) {
  this.get('controller').session.get('userSettings').save();
  return;
}}
});

export default SettingsEditablePrivacyView