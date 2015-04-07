`import Feeds from '../feeds'`
`import Enums from 'web/enums'`

JobsFeedController = Feeds.extend(
  jobs: (->
    filter = {}
    scope = @get('audienceScope')
    if scope == Enums.FeedAudienceScope.Me
      filter['user_id'] = @get('session.CURRENT_USER_ID')
      filter['home_id'] = @get('session.CURRENT_HOME_ID')
    else if scope == Enums.FeedAudienceScope.Home
      filter['home_id'] = @get('session.CURRENT_HOME_ID')
    @store.filter 'job', filter, (jobs) ->
      true
  ).property('audienceScope')
  stream: (->
    jobs = @get('jobs') or []
    stream = Ember.A()
    stream.pushObjects jobs.toArray()
    Ember.ArrayProxy.createWithMixins Ember.SortableMixin,
      content: stream
      sortProperties: @sortProperties
      sortAscending: @sortAscending
  ).property('jobs.@each', 'audienceScope'))

`export default JobsFeedController`
