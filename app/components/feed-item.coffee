`
import Ember from 'ember'
import Transaction from 'web/models/transaction'
import Job from 'web/models/job'
`

FeedItem = Ember.Component.extend
  classNames: [ 'event' ]
  classType: (->
    model = @get('item')
    if model instanceof Transaction then 'transaction' else if model instanceof Job then 'job' else ''
  ).property()
  cornerColor: (->
    classType = @get('classType')
    base = 'ui corner left label '
    base + (if classType == 'transaction' then 'green' else if classType == 'job' then 'red' else '')
  ).property('classType')
  iconType: (->
    classType = @get('classType')
    base = 'icon '
    base + (if classType == 'transaction' then 'dollar' else if classType == 'job' then 'briefcase' else '')
  ).property('classType')
  userImage: (->
    @get 'item.user.image'
  ).property()
  fuzzyTime: (->
    moment(@get('item.date')).fromNow()
  ).property('item.date')
  displayName: (->
    isMe = @get('item.user') == @get('targetObject.session.authUser')
    if isMe
      'You'
    else
      @get 'item.user.name'
  ).property('item.user')
  actionName: (->
    classType = @get('classType')
    if classType == 'transaction' then 'bought' else if classType == 'job' then 'performed' else ''
  ).property()
  payableInvoice: (->
    found = null
    @item.get('invoices').forEach (inv, index) =>
      found = inv if @user.get('id') is inv.get 'payerId'
    found
  ).property("model.invoices")
  actions:
    openInvoiceAction: (invoice) ->
      @sendAction('openInvoiceAction', @item, invoice)

`export default FeedItem`
