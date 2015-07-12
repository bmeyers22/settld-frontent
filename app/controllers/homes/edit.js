import Ember from 'ember'

var HomesEditController = Ember.Controller.extend({dataGroups:
  {info: [
    'name',
    'roommateCount',
    'rentPerMonth'
  ],
  location: [
    'address',
    'city',
    'state',
    'zip'
  ],
  password: [
    'currentPassword',
    'password',
    'passwordConfirmation'
  ]}});

export default HomesEditController