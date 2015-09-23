import Ember from 'ember';
import DS from 'ember-data';
var User;

User = DS.Model.extend({
  homes: DS.hasMany('home', {
    async: true
  }),
  userInfos: DS.hasMany('userInfos', {
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
  name: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName' + ' ' + this.get('lastName'));
  }),
  providers: DS.attr('array'),
  facebook: DS.attr('object'),
  venmo: DS.attr('object')
});

export default User;
