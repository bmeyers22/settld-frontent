import Ember from 'ember'

var HomesEditableSectionView = Ember.View.extend(
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
    cancelEdit: function(home) {
      home.setProperties(this.get('copiedProps'));
      this.set('isEditing', false);
      return;
    },
    saveEdit: function(home) {
      home.save();
      this.set('isEditing', false);
      return;
    },
    submitEdit: function() {
      this.$('.ui.form').form('submit');
      return;
    },
  }didInsertElement: function() {}}
);

export default HomesEditableSectionView
