`import Ember from 'ember'`
`import Enums from 'web/enums'`

FeedsController = Ember.Controller.extend(
  audienceScope: Enums.FeedAudienceScope.Home
  needs: 'application'
  sortProperties: [ 'date' ]
  sortAscending: false
  hasStream: (->
    if @get('stream.length') == 0 then false else true
  ).property('stream'))

`export default FeedsController`
