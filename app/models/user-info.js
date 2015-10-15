import DS from 'ember-data';

var UserInfo = DS.Model.extend({
  user: DS.belongsTo('user', {
    async: true
  }),
  home: DS.belongsTo('home', {
    async: true
  }),
  score: DS.attr('number', { defaultValue: 0 }),
  balance: DS.attr('number', { defaultValue: 0 }),
  choresToDo: DS.attr('number', { defaultValue: 0 })
});

export default UserInfo
