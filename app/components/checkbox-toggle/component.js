import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    let self = this;
    this.$('.ui.checkbox.toggle').checkbox({
      onChange() {
        return self.sendAction('toggle');
      }
    });
  }
});
