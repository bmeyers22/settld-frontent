`import Feeds from '../feeds'`

TransactionsFeedController = Feeds.extend(
  transactions: (->
    filter = {}
    scope = @get('audienceScope')
    if scope == @Enums.FeedAudienceScope.Me
      filter['user_id'] = @get('session.CURRENT_USER_ID')
      filter['home_id'] = @get('session.CURRENT_HOME_ID')
    else if scope == @Enums.FeedAudienceScope.Home
      filter['home_id'] = @get('session.CURRENT_HOME_ID')
    @store.find 'transaction', filter
    # return this.store.filter('transaction', filter, function (txns) {
    #   return true;
    # });
  ).property('audienceScope')
  stream: (->
    txn = @get('transactions') or []
    stream = Ember.A()
    stream.pushObjects txn.toArray()
    Ember.ArrayProxy.createWithMixins Ember.SortableMixin,
      content: stream
      sortProperties: @sortProperties
      sortAscending: @sortAscending
  ).property('transactions.@each', 'audienceScope'))

`export default TransactionsFeedController`
