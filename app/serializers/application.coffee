`import DS from 'ember-data'`

ApplicationSerializer = DS.ActiveModelSerializer.extend
  primaryKey: '_id'
  serializeHasMany: (record, json, relationship) ->
    key = relationship.key
    # don't care which kind of hasMany relationship this is
    json[key] = Ember.get(record, key).mapBy 'id'


`export default ApplicationSerializer`
