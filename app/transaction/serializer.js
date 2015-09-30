import { ActiveModelSerializer } from 'active-model-adapter';
import DS from 'ember-data';

export default ActiveModelSerializer.extend( DS.EmbeddedRecordsMixin, {
  primaryKey: '_id',
  attrs: {
    invoices: {
      embedded: 'always'
    }
  }
});
