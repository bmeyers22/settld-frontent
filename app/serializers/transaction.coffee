`import { ActiveModelSerializer } from 'active-model-adapter'`
`import DS from 'ember-data'`

TransactionSerializer = ActiveModelSerializer.extend DS.EmbeddedRecordsMixin,
  primaryKey: '_id'
  attrs:
    invoices:
      embedded: 'always'

`export default TransactionSerializer`
