`
import Ember from 'ember'
`

AppView = Ember.View.extend
  didInsertElement: ->
    $('.main-home-select').dropdown 'set value', @get('controller.model.CURRENT_HOME_ID')

`export default AppView`
