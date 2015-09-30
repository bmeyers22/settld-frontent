import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'editable-section', 'ui', 'form' ],
  classNameBindings: [ 'isEditing:editing' ],
  isEditing: false,
  copiedProps: {},
  actions: {
    editSection() {
      this.set('copiedProps', this.get('model').getProperties(Object.keys(this.get('group'))));
      this.set('isEditing', true);
    },
    cancelEdit() {
      this.get('model').setProperties(this.get('copiedProps'));
      this.set('isEditing', false);
    },
    saveEdit() {
      if (this.$('.ui.form').form('is valid')) {
        this.get('model').save().then((response) => {
          this.set('isEditing', false);
        }).fail( (response) => {
          this.$('.ui.form').form('add errors', response.errors);
        });;
      }
    },
    submitEdit() {
      this.$('.ui.form').form('submit');
    },
  },
  didInsertElement() {
    this.$('.ui.form').form({
      fields: this.get('group'),
      on: 'submit'
    });
  }
});
