import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['large-transparent-input', 'ui', 'form'],
  value: '',
  didInsertElement() {
    let self = this;
    this.$('input').focus();
    this.$().form({
      on: 'blur',
      fields: {
        value: {
          identifier  : 'value',
          rules: [
            {
              type   : self.get('validationType') || 'empty',
              prompt : self.get('validationPrompt') || 'Please enter a value'
            }
          ]
        }
      },
      onSuccess(ev, fields) {
        self.sendAction('submit', self.get('value'));
      }
    })
  }
});
