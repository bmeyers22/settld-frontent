import Ember from 'ember';

var HomesNewView = Ember.View.extend({
  didInsertElement: function() {
    var self = this;
    this.$('.state-dropdown').dropdown({});
    this.$('.why-rent').popup({});
    this.$('.ui.form.new-home').form({
      name:
        {identifier: 'name',
        rules: [ {
          type: 'empty',
          prompt: 'Please give your home a name'
        } ]},
      zip:
        {identifier: 'zip',
        rules: [ {
          type: 'empty',
          prompt: 'Please enter your zip code'
        } ]},
      roommateCount:
        {identifier: 'roommateCount',
        rules: [ {
          type: 'empty',
          prompt: 'How many roommates are you?'
        } ]},
      rentPerMonth:
        {identifier: 'rentPerMonth',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your rent'
          },
          {
            type: 'number',
            prompt: 'Numbers only please'
          },
          {
            type: 'gt[0]',
            prompt: 'Rent should be greater than 0'
          }
        ]},
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
      confirm:
        {identifier: 'confirm',
        rules: [ {
          type: 'match[password]',
          prompt: 'Passwords must match'
        } ]}
    }, {
      on: 'blur',
      onValid: function() {
        this.parent().parent().addClass('valid');
        return;
      },
      onInvalid: function() {
        this.parent().parent().removeClass('valid');
        return;
      },
      onSuccess: function() {
        self.send('createHome', self.get('controller.model'));
        return;
      },
      onFailure: function() {}
    });
    return;
  },
  actions: {
    createHome: function(home) {
      var self = this;
      var controller = this.get('controller');
      controller.send('saveHome', home);
      return;
    }
  }
});

export default HomesNewView
