`import Feeds from '../feeds'`

DashboardFeedController = Feeds.extend(
  transactions: (->
    filter = {}
    scope = @get('audienceScope')
    if scope == @Enums.FeedAudienceScope.Me
      filter['user'] = @get('appController.CURRENT_USER_ID')
      filter['home'] = @get('appController.CURRENT_HOME_ID')
    else if scope == @Enums.FeedAudienceScope.Home
      filter['home'] = @get('appController.CURRENT_HOME_ID')
    # return this.store.find('transaction', filter);
    @store.filter 'transaction', filter, (txns) ->
      true
  ).property('audienceScope')
  jobs: (->
    filter = {}
    scope = @get('audienceScope')
    if scope == @Enums.FeedAudienceScope.Me
      filter['user_id'] = @get('appController.CURRENT_USER_ID')
      filter['home_id'] = @get('appController.CURRENT_HOME_ID')
    else if scope == @Enums.FeedAudienceScope.Home
      filter['home_id'] = @get('appController.CURRENT_HOME_ID')
    @store.filter 'job', filter, (jobs) ->
      true
  ).property('audienceScope')
  stream: (->
    txn = @get('transactions') or []
    job = @get('jobs') or []
    stream = Ember.A()
    stream.pushObjects txn.toArray()
    stream.pushObjects job.toArray()
    Em.ArrayProxy.createWithMixins Ember.SortableMixin,
      content: stream
      sortProperties: @sortProperties
      sortAscending: @sortAscending
  ).property('transactions.@each', 'jobs.@each', 'audienceScope'))

`export default DashboardFeedController`