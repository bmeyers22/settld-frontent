
import Ember from 'ember';
import Enums from 'web/enums';
import AudienceButtonContainer from './audience-button-container';


var FeedView = Ember.View.extend(
  {templateName: 'feed',
  audienceButtonViews: (function() {
    return AudienceButtonContainer.create();
  }
  ).property(),
  actions:
    {changeAudience: function(num, event) {
      this.get('controller').set('audienceScope', num);
      return;
    }}
});

export default FeedView
