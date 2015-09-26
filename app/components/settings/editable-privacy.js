import EditableSection from '../editable-section';

export default EditableSection.extend({
  actions: {
    saveEdit(user) {
      this.get('controller').session.get('userSettings').save();
    }
  }
});
