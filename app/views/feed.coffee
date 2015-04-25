`
import Ember from 'ember'
import Enums from 'web/enums'
import AudienceButtonContainer from './audience-button-container'
`

FeedView = Ember.View.extend(
  templateName: 'feed'
  audienceButtonViews: (->
    AudienceButtonContainer.create()
  ).property()
  actions:
    changeAudience: (num, event) ->
      @get('controller').set 'audienceScope', num
      return
)

`export default FeedView`
