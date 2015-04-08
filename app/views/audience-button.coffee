`import Ember from 'ember'`

# This is for the feed controller only at the moment
AudienceButtonView = Ember.View.extend(
  attributeBindings: [ 'data-audience' ]
  classNames: [
    'ui'
    'button'
  ]
  classNameBindings: [ 'active' ]
  active: (->
    @get('parentView.controller.audienceScope') == @get('index')
  ).property('parentView.controller.audienceScope')
  index: null
  click: (e) ->
    @get('parentView').send 'changeAudience', @get('index')
    return
)

`export default AudienceButtonView`