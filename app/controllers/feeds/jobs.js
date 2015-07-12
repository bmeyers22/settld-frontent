import Feeds from '../feeds'
import Enums from 'web/enums'

var JobsFeedController = Feeds.extend(
  {jobs: (function() {
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
  }
  ).property('audienceScope'),
  stream: (function() {
    var jobs = this.get('jobs') || [];
    var stream = Ember.A();
    stream.pushObjects(jobs.toArray());
    return Ember.ArrayProxy.createWithMixins( Ember.SortableMixin,
      content: stream,
      sortProperties: this.sortProperties,
      sortAscending: this.sortAscending
    });
  }
  ).property('jobs.@each', 'audienceScope')});

export default JobsFeedController
