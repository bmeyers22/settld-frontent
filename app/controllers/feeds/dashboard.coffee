`import App from 'web/app'`
`import Feeds from '../feeds'`

DashboardFeedController = Feeds.extend(
  transactions: (->
    filter = {}
    scope = @get('audienceScope')
    if scope == @Enums.FeedAudienceScope.Me
      filter['user'] = @get('session.CURRENT_USER_ID')
      filter['home'] = @get('session.CURRENT_HOME_ID')
    else if scope == @Enums.FeedAudienceScope.Home
      filter['home'] = @get('session.CURRENT_HOME_ID')
    # return this.store.find('transaction', filter);
    @store.query 'transaction', filter
  ).property('audienceScope')
  stream: (->
    stream = @get('transactions') or []
    Ember.ArrayProxy.createWithMixins Ember.SortableMixin,
      content: stream
      sortProperties: @sortProperties
      sortAscending: @sortAscending
  ).property('transactions.@each'))

`export default DashboardFeedController`
