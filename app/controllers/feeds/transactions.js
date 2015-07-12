import Feeds from '../feeds'

var TransactionsFeedController = Feeds.extend(
  {transactions: (function() {
    var filter = {};
    var scope = this.get('audienceScope');
    if (scope === this.Enums.FeedAudienceScope.Me) {
      filter['user_id'] = this.get('session.CURRENT_USER_ID');
      filter['home_id'] = this.get('session.CURRENT_HOME_ID');
    } else if (scope === this.Enums.FeedAudienceScope.Home) {
      filter['home_id'] = this.get('session.CURRENT_HOME_ID');
    }
    return this.store.find('transaction', filter);
  }
    // return this.store.filter('transaction', filter, function (txns) {
    //   return true;
    // });
  ).property('audienceScope'),
  stream: (function() {
    var txn = this.get('transactions') || [];
    var stream = Ember.A();
    stream.pushObjects(txn.toArray());
    return Ember.ArrayProxy.createWithMixins( Ember.SortableMixin,
      content: stream,
      sortProperties: this.sortProperties,
      sortAscending: this.sortAscending
    });
  }
  ).property('transactions.@each', 'audienceScope')});

export default TransactionsFeedController
