import { ActiveModelSerializer } from 'active-model-adapter';

var ApplicationSerializer = ActiveModelSerializer.extend({
  primaryKey: '_id',
  serializeHasMany(record, json, relationship) {
    var key = relationship.key;
    // don't care which kind of hasMany relationship this is
    return json[key] = Ember.get(record, key).mapBy('id');
  }
});


export default ApplicationSerializer
