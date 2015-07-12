import Ember from 'ember'

var SettingsEditableSectionView = Ember.View.extend(
  {classNames: [ 'editable-section' ],
  classNameBindings: [ 'isEditing:editing' ],
  isEditing: false,
  copiedProps: {},
  actions:
    {editSection: function() {
      this.set('copiedProps', this.get('content').getProperties(this.get('group')));
      this.set('isEditing', true);
      return;
    },
    cancelEdit: function(user) {
      user.setProperties(this.get('copiedProps'));
      this.set('isEditing', false);
      return;
    },
    saveEdit: function(user) {
      user.save();
      this.set('isEditing', false);
      return;
    },
  }didInsertElement: function() {
    var self = this;
    this.$('.ui.checkbox').checkbox({
      onEnable: function() {
        self.get('controller').session.set('userSettings.hasPublicProfile', true);
        self.get('controller').session.get('userSettings').save();
        return;
      },
      onDisable: function() {
        self.get('controller').session.set('userSettings.hasPublicProfile', false);
        self.get('controller').session.get('userSettings').save();
        return;
      }
    });
    return;
  }}
);

export default SettingsEditableSectionView
