import Ember from 'ember';
import Enums from 'web/enums';

var FeedsController = Ember.Controller.extend({
  audienceScope: Enums.FeedAudienceScope.Home,
  needs: 'application',
  sortProperties: [ 'date' ],
  sortAscending: false,
  hasStream: (function() {
    if (this.get('stream.length') === 0) { false; } else { true; }
  }
  ).property('stream')
});

export default FeedsController
