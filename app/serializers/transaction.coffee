`import DS from 'ember-data'`

TransactionSerializer = DS.ActiveModelSerializer.extend DS.EmbeddedRecordsMixin,
  primaryKey: '_id'
  attrs:
    invoices: 
      embedded: 'always'

`export default TransactionSerializer`
