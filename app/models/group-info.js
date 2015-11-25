import DS from 'ember-data';

export default DS.Model.extend({
  home: DS.belongsTo('home', {
    async: true
  }),
  users: DS.attr('object'),
  createdAt: DS.attr('number', {
    defaultValue() { return new Date().getTime(); }
  })
});
