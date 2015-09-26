import { ActiveModelSerializer } from 'active-model-adapter';

var ApplicationSerializer = ActiveModelSerializer.extend({
  primaryKey: '_id',
  serializeHasMany(record, json, relationship) {
    var key = relationship.key;
    // don't care which kind of hasMany relationship this is
    let records = Ember.get(record, key);
    if (records) {
      return json[key] = records.mapBy('id');
    } else {
      return json[key] = []
    }

  }
});


export default ApplicationSerializer
