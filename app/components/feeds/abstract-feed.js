import Ember from 'ember';
import Enums from 'web/enums';


export default Ember.Component.extend({
  audienceScope: Enums.FeedAudienceScope.Me,
  ENUMS: Enums,
  hasStream: Ember.computed('stream', function() {
    return this.get('stream.length') > 0;
  }),
  actions:{
    changeAudience(num) {
      this.set('audienceScope', num);
    },
    openActionBar(model) {
      this.sendAction('openActionBar', model);
    }
  }
});
