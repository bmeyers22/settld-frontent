import App from 'web/app';
import Feeds from '../feeds';

var DashboardFeedController = Feeds.extend({
  transactions: function() {
    var filter = {};
    var scope = this.get('audienceScope');
    if (scope === this.Enums.FeedAudienceScope.Me) {
      filter['user'] = this.get('session.CURRENT_USER_ID');
      filter['home'] = this.get('session.CURRENT_HOME_ID');
    } else if (scope === this.Enums.FeedAudienceScope.Home) {
      filter['home'] = this.get('session.CURRENT_HOME_ID');
    }
    // return this.store.find('transaction', filter);
    return this.store.query('transaction', filter);
  }.property('audienceScope'),
  stream: function() {
    var stream = this.get('transactions') || [];
    return Ember.ArrayProxy.createWithMixins( Ember.SortableMixin, {
      content: stream,
      sortProperties: this.sortProperties,
      sortAscending: this.sortAscending
    });
  }.property('transactions.@each')
});

export default DashboardFeedController;
