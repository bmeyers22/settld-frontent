`import DS from 'ember-data'`

UserSetting = DS.Model.extend(
  user: DS.belongsTo('user')
  hasPublicProfile: DS.attr('boolean')
  isUserConfigured: DS.attr('boolean')
  defaultHome: DS.attr('string'))

`export default UserSetting`
