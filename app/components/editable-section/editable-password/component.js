import EditableSection from '../component';

export default EditableSection.extend({
  didInsertElement() {
    this._super();
    var self = this;
    return this.$('.ui.form').form({
      fields: {
        currentPassword:{
          identifier: 'currentPassword',
          rules: [ {
            type: 'empty',
            prompt: 'Please enter a password'
          } ]
        },
        password:
          {identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a password'
            },
            {
              type: 'length[8]',
              prompt: 'Your password must be at least 8 characters'
            }
          ]
        },
        passwordConfirmation:
          {identifier: 'passwordConfirmation',
          rules: [ {
            type: 'match[password]',
            prompt: 'Passwords must match'
          } ]
        }
      },
      on: 'submit',
      onValid() {
        return this.parent().parent().addClass('valid');
      },
      onInvalid() {
        return this.parent().parent().removeClass('valid');
      },
      onSuccess() {
        return self.send('saveEdit', self.get('content'));
      },
      onFailure() {
        return console.log('Invalid form');
      }
    });
  }
});
