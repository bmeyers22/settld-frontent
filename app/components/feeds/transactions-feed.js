import Ember from 'ember';
import Feeds from './abstract-feed';
import Enums from 'web/enums';

var TransactionsFeedController = Feeds.extend(
  {transactions: Ember.computed(
    'audienceScope',
    // return this.store.filter('transaction', filter, function (txns) {
    //   return true;
    // });
    function() {
      var filter = {};
      var scope = this.get('audienceScope');
      if (scope === Enums.FeedAudienceScope.Me) {
        filter['user_id'] = this.get('currentSession.CURRENT_USER_ID');
        filter['home_id'] = this.get('currentSession.CURRENT_HOME_ID');
      } else if (scope === Enums.FeedAudienceScope.Home) {
        filter['home_id'] = this.get('currentSession.CURRENT_HOME_ID');
      }
      return this.store.find('transaction', filter);
    }
  ),
  stream: Ember.computed('transactions.[]', 'audienceScope', function() {
    var txn = this.get('transactions') || [];
    var stream = Ember.A();
    stream.pushObjects(txn.toArray());
    return Ember.ArrayProxy.createWithMixins( Ember.SortableMixin, {
      content: stream,
      sortProperties: this.sortProperties,
      sortAscending: this.sortAscending
    });
  })});

export default TransactionsFeedController
