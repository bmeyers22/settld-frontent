`
import Ember from 'ember'
`

DashboardIndexView = Ember.View.extend(
  templateName: 'dashboard/index'
  classNames: ['overview-segment-container', 'ui', 'three', 'column', 'grid']
  didInsertElement: ->
    @$('#test_user_data').on 'click', (e) ->
      Ember.$.get '/api/v1/user_data/' + @session.get('CURRENT_USER_ID'), {}, (data) ->
        console.log data
        return
      return
    @$('.ui.corner.label.add-transaction').popup(
      position: 'right center'
      delay: 400).on 'click', (e) ->
      $(this).popup 'hide'
      return
    @$('.ui.corner.label.add-job').popup(
      position: 'left center'
      delay: 400).on 'click', (e) ->
      $(this).popup 'hide'
      return
    return
)

`export default DashboardIndexView`
