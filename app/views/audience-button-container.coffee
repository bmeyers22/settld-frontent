`import Ember from 'ember'`
`import Enums from 'web/enums'`
`import AudienceButtonContainer from './audience-button'`
`import AudienceButtonView from './audience-button'`

AudienceContainer = Ember.ContainerView.extend
      init: ->
        @_super();
        @pushObject @createChildView @me
        @pushObject @createChildView @home
        @pushObject @createChildView @global
      me: AudienceButtonView.extend
        index: Enums.FeedAudienceScope.Me
        iconClass: 'user icon'
      home: AudienceButtonView.extend
        index: Enums.FeedAudienceScope.Home
        iconClass: 'users icon'
      global: AudienceButtonView.extend
        index: Enums.FeedAudienceScope.Global
        iconClass: 'globe icon'

`export default AudienceContainer`