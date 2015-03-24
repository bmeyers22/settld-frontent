`import Ember from 'ember'`

HomesEditController = Ember.ObjectController.extend(dataGroups:
  info: [
    'name'
    'roommateCount'
    'rentPerMonth'
  ]
  location: [
    'address'
    'city'
    'state'
    'zip'
  ]
  password: [
    'currentPassword'
    'password'
    'passwordConfirmation'
  ])

`export default HomesEditController`