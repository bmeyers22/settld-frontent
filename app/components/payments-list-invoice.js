import Ember from 'ember';


export default Ember.Component.extend({
  classNames: ['ui', 'one', 'column', 'invoices', 'grid'],
  gestureAllowed: ['pan'],
  didInsertElement() {
    this.$('.ui.checkbox')
      .checkbox()
      .addClass(this.get('venmo') ? '' : 'disabled');
  },
  actions: {
    showOptions() {
      this.$('.content.visible').addClass('hidden');
    },
    hideOptions() {
      this.$('.content.visible').removeClass('hidden');
    },
    remove(invoice) {
      this.sendAcion('remove', invoice)
    }
  }
});
