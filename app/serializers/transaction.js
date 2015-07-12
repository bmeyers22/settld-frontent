import { ActiveModelSerializer } from 'active-model-adapter'
import DS from 'ember-data'

var TransactionSerializer = ActiveModelSerializer.extend( DS.EmbeddedRecordsMixin,
  primaryKey: '_id',
  attrs:
    {invoices:
      {embedded: 'always'}
});

}export default TransactionSerializer
