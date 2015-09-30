
import Ember from 'ember';


var SettingsIndexController = Ember.Controller.extend({
  dataGroups:{
    info: [
      'firstName',
      'lastName',
      'email'
    ],
    password: [
      'currentPassword',
      'password',
      'passwordConfirmation'
    ]
  },
  actions: {
    changePassword(user) {
      return user.save();
    }
  }
});

export default SettingsIndexController
