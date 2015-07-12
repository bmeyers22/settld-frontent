import Ember from 'ember'

var Modal = Ember.Component.extend({
  actions: {
    complete() {
      this.$('.dimmer').dimmer('show');
      return this.sendAction("complete");
    }
  },
  didInsertElement() {
    return this.$('.ui.global.modal').modal(
      {
        detachable: false,
        selector: {
          close: '.close',
          approve: '.actions .positive, .actions .approve, .actions .ok',
          deny: '.actions .negative, .actions .deny, .actions .cancel'
        },
        onHide: () => {
          return this.$('.dimmer').dimmer('hide');
        },
        onHidden: () => {
          return this.sendAction("close");
        }
      }).modal('show');
  }
});

export default Modal
