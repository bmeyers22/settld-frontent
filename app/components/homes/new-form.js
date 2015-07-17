import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['new-home-wrapper'],
  enums: Ember.inject.service('enums'),
  actions: {
    cancel() {
      this.sendAction('cancel');
    }
  },
  didInsertElement: function() {
    var self = this;
    this.$('.state-dropdown').dropdown({});
    this.$('.why-rent').popup({});
    this.$('.ui.form.new-home').form({
      on: 'blur',
      onSuccess: function() {
        self.sendAction('create', {
          name: self.get('name'),
          address: self.get('address'),
          city: self.get('city'),
          state: self.get('state'),
          zip: self.get('zip'),
          roommateCount: self.get('roommateCount'),
          rentPerMonth: self.get('rentPerMonth'),
          password: self.get('password'),
          passwordConfirmation: self.get('passwordConfirmation')
        });
      },
      onFailure: function() {},
      fields: {
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
          } ]
        }
      }
    });
  }
});
