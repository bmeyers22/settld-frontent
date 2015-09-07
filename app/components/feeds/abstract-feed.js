import Ember from 'ember';
import Enums from 'web/enums';


export default Ember.Component.extend({
  audienceScope: Enums.FeedAudienceScope.Home,
  ENUMS: Enums,
  sortProperties: [ 'date' ],
  sortAscending: false,
  hasStream: function() {
    return this.get('stream.length') > 0;
  }.property('stream'),
  actions:{
    changeAudience: function(num) {
      this.set('audienceScope', num);
    },
    openActionBar() {
      this.sendAction('openActionBar')
    }
  }
});
