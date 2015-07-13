import DS from 'ember-data';

var UserInfo = DS.Model.extend({
  user: DS.belongsTo('user'),
  score: DS.attr('number'),
  balance: DS.attr('number'),
  choresToDo: DS.attr('number')
});

export default UserInfo