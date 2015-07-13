
import Ember from 'ember';


var SettingsIndexController = Ember.Controller.extend(
  {dataGroups:
    {info: [
      'firstName',
      'lastName',
      'email'
    ],
    password: [
      'current_password',
      'password',
      'password_confirmation'
    ]},
  needs: 'application',
  current_password: '',
  password: '',
  password_confirmation: '',
  actions:
    {changePassword: function(user) {
      return user.save();
    }}
});

export default SettingsIndexController
