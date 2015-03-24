`import Ember from 'ember'`

AppView = Ember.View.extend(didInsertElement: ->
  $('.main-home-select').dropdown 'set value', @get('controller.CURRENT_HOME_ID')
  return
)

`export default AppView`