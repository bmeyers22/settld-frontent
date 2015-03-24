`import Ember from 'ember'`
`import Enums from 'web/enums'`

FeedsController = Ember.ObjectController.extend(
  audienceScope: Enums.FeedAudienceScope.Home
  needs: 'application'
  appController: Ember.computed.alias('controllers.application')
  sortProperties: [ 'date' ]
  sortAscending: false
  hasStream: (->
    if @get('stream.length') == 0 then false else true
  ).property('stream'))

`export default FeedsController`