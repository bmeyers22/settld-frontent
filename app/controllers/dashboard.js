import Ember from 'ember';
import Enums from 'web/enums';

var DashboardController = Ember.Controller.extend({
  transactions: Ember.computed('audienceScope', function() {
    var filter = {};
    var scope = this.get('audienceScope');
    if (scope === Enums.FeedAudienceScope.Me) {
      filter['user'] = this.get('session.CURRENT_USER_ID');
      filter['home'] = this.get('session.CURRENT_HOME_ID');
    } else if (scope === Enums.FeedAudienceScope.Home) {
      filter['home'] = this.get('session.CURRENT_HOME_ID');
    }
    // return this.store.find('transaction', filter);
    return this.store.query('transaction', filter);
  }),
  stream: Ember.computed('transactions.[]', function() {
    var stream = this.get('transactions') || [];
    return Ember.ArrayProxy.createWithMixins( Ember.SortableMixin, {
      content: stream,
      sortProperties: this.sortProperties,
      sortAscending: this.sortAscending
    });
  })  
});

export default DashboardController
