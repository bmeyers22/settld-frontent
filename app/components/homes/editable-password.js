import HomesEditableSectionView from '../editable-section';

var HomesEditablePasswordView = HomesEditableSectionView.extend({
  didInsertElement: function() {
    this._super();
    var self = this;
    return this.$('.ui.form').form({
      currentPassword:
        {identifier: 'currentPassword',
        rules: [ {
          type: 'empty',
          prompt: 'Please enter a password'
        } ]},
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
        ]},
      passwordConfirmation:
        {identifier: 'passwordConfirmation',
        rules: [ {
          type: 'match[password]',
          prompt: 'Passwords must match'
        } ]}
    }, {
      on: 'blur',
      onValid: function() {
        return this.parent().parent().addClass('valid');
      },
      onInvalid: function() {
        return this.parent().parent().removeClass('valid');
      },
      onSuccess: function() {
        return self.send('saveEdit', self.get('content'));
      },
      onFailure: function() {
        return console.log('Invalid form');
      }
    });
  }
});

export default HomesEditablePasswordView
