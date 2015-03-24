`import Ember from 'ember'`

HomesIndexView = Ember.View.extend
  didInsertElement: ->
    @$('.add-join.ui.dropdown').dropdown()

`export default HomesIndexView`