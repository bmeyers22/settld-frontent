import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['large-transparent-input', 'ui', 'form'],
  value: '',
  didInsertElement() {
    let self = this,
      input = this.$('input'),
      submit = this.$('.submit');

    input.keypress( (e) => {
      if (e.which == 13) {
        this.$().form('submit');
      }
    });
    this.$().form({
      on: 'change',
      fields: {
        empty: {
          identifier  : 'empty',
          rules: [
            {
              type   : self.attrs.validationType || 'empty',
              prompt : self.attrs.validationPrompt || 'Please enter a value'
            }
          ]
        }
      },
      onValid(ev, fields) {
        submit.removeClass('disabled');
        submit.addClass('valid');
      },
      onInvalid(err) {
        submit.addClass('disabled');
        submit.removeClass('valid');
      },
      onSuccess() {
        self.sendAction('submit', self.get('value'));
      }
    })
  }
});
