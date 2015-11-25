import DS from 'ember-data';

var Home = DS.Model.extend({
  users: DS.hasMany('user', { async: true }),
  groupInfo: DS.belongsTo('group-info', { async: true }),
  name: DS.attr('string'),
  address: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  zip: DS.attr('string'),
  roommateCount: DS.attr('number'),
  rentPerMonth: DS.attr('number'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  createdAt: DS.attr('number', {
    defaultValue() { return new Date().getTime(); }
  })
});

export default Home
