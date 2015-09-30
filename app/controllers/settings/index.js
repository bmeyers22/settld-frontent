
import Ember from 'ember';


var SettingsIndexController = Ember.Controller.extend({
  dataGroups:{
    info: {
      firstName:{
        rules: [{
          type: 'empty',
          prompt: 'Please enter your name'
        }]
      }
    },
    password: {
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
      passwordConfirmation:{
        identifier: 'passwordConfirmation',
        rules: [{
          type: 'match[password]',
          prompt: 'Passwords must match'
        }]
      }
    }
  },
  actions: {
    changePassword(user) {
      return user.save();
    }
  }
});

export default SettingsIndexController
