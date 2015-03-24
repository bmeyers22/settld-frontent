`import Ember from 'ember'`
`import Transaction from 'frontend/models/transaction'`
`import Job from 'frontend/models/job'`

FeedItemView = Ember.View.extend(
  templateName: 'feedItem'
  classNames: [ 'event' ]
  classType: (->
    model = @get('controller.model')
    if model instanceof Transaction then 'transaction' else if model instanceof Job then 'job' else ''
  ).property()
  cornerColor: (->
    classType = @get('classType')
    base = 'ui corner left label '
    base + (if classType == 'transaction' then 'green' else if classType == 'job' then 'red' else '')
  ).property()
  iconType: (->
    classType = @get('classType')
    base = 'icon '
    base + (if classType == 'transaction' then 'dollar' else if classType == 'job' then 'briefcase' else '')
  ).property()
  userImage: (->
    @get 'controller.model.user.image'
  ).property()
  fuzzyTime: (->
    moment(@get('controller.model.date')).fromNow()
  ).property('controller.model.date')
  displayName: (->
    isMe = @get('controller.model.user') == @get('controller.session.authUser')
    if isMe
      'You'
    else
      @get 'controller.model.user.name'
  ).property('controller.model.user')
  actionName: (->
    classType = @get('classType')
    if classType == 'transaction' then 'bought' else if classType == 'job' then 'performed' else ''
  ).property())

`export default FeedItemView`
