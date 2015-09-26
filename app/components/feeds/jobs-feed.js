import Ember from 'ember';
import Feeds from './abstract-feed';
import Enums from 'web/enums';

var JobsFeedController = Feeds.extend({
  jobs: Ember.computed('audienceScope', function() {
    var filter = {};
    var scope = this.get('audienceScope');
    if (scope === Enums.FeedAudienceScope.Me) {
      filter['user_id'] = this.get('session.CURRENT_USER_ID');
      filter['home_id'] = this.get('session.CURRENT_HOME_ID');
    } else if (scope === Enums.FeedAudienceScope.Home) {
      filter['home_id'] = this.get('session.CURRENT_HOME_ID');
    }
    return this.store.filter('job', filter, function(jobs) {
      return true;
    });
  }),
  stream: Ember.computed('jobs.[]', 'audienceScope', function() {
    var jobs = this.get('jobs') || [];
    var stream = Ember.A();
    stream.pushObjects(jobs.toArray());
    return Ember.ArrayProxy.createWithMixins( Ember.SortableMixin, {
      content: stream,
      sortProperties: this.sortProperties,
      sortAscending: this.sortAscending
    });
  })});

export default JobsFeedController
