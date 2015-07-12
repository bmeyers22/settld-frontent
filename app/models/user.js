import DS from 'ember-data';
var User;

User = DS.Model.extend({
  homes: DS.hasMany("home", {
    async: true
  }),
  fuid: DS.attr('string'),
  vuid: DS.attr('string'),
  email: DS.attr('string'),
  age: DS.attr('number'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  currentPassword: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  image: DS.attr('string'),
  name: (function() {
    return this.get('firstName' + ' ' + this.get('lastName'));
  }).property('firstName', 'lastName'),
  providers: DS.attr('array'),
  facebook: DS.attr('object'),
  venmo: DS.attr('object')
});

export default User;
