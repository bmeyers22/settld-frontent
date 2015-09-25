import { ActiveModelSerializer } from 'active-model-adapter';

var ApplicationSerializer = ActiveModelSerializer.extend({
  primaryKey: '_id'
});


export default ApplicationSerializer
