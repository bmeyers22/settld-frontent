import Ember from 'ember'
import Enums from 'web/enums'
import AudienceButtonContainer from './audience-button'
import AudienceButtonView from './audience-button'

var AudienceContainer = Ember.ContainerView.extend({
      init: function() {
        this._super(),
        this.pushObject(this.createChildView(this.me));
        this.pushObject(this.createChildView(this.home));
        return this.pushObject(this.createChildView(this.global));
      },
      me: AudienceButtonView.extend({
        index: Enums.FeedAudienceScope.Me,
        iconClass: 'user icon'
      }),
      home: AudienceButtonView.extend({
        index: Enums.FeedAudienceScope.Home,
        iconClass: 'users icon'
      }),
      global: AudienceButtonView.extend({
        index: Enums.FeedAudienceScope.Global,
        iconClass: 'globe icon'
      })
});

export default AudienceContainer