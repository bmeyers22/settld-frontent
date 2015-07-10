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
  iconType: (->
    classType = @get('classType')
    base = 'icon '
    base + (if classType == 'transaction' then 'dollar' else if classType == 'job' then 'briefcase' else '')
  ).property('classType')
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
    @get('item').getOpenInvoice?(@get('user'))
  ).property()
  actions:
    openInvoiceAction: (invoice) ->
      @sendAction 'openInvoiceAction', @get('item')

`export default FeedItem`
