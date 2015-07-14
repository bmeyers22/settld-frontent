import Ember from 'ember';
import Enums from 'web/enums';

var FeedsController = Ember.Controller.extend({
  audienceScope: Enums.FeedAudienceScope.Home,
  needs: 'application',
  sortProperties: [ 'date' ],
  sortAscending: false,
  hasStream: function() {
    return this.get('stream.length') > 0;
  }.property('stream')
});

export default FeedsController
