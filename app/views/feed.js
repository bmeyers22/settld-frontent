import Ember from 'ember';
import Enums from 'web/enums';


var FeedView = Ember.View.extend({
  templateName: 'feed',
  actions:{
    changeAudience: function(num, event) {
      this.get('controller').set('audienceScope', num);
      return;
    }
  }
});

export default FeedView
