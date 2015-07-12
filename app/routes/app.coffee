`
import Ember from 'ember'
`

AppRoute = Ember.Route.extend
  beforeModel: (transition) ->
    if not @session.get('authUser')?
      transition.abort()
      @transitionTo 'login'
    else if !@session.get('userSettings.isUserConfigured')
      transition.abort()
      @transitionTo 'getstarted'
    else
      @transitionTo 'group', @session.get('authUser.homes').indexOf(@session.get('currentHome')) if /^app/.test transition.targetName
  model: ->
    @session
  actions:
    toggleGroupsBar: () ->
      Ember.run ->
        $('.groups-bar').sidebar 'toggle'
    openInvoiceAction: (txn) ->
      this.controllerFor('invoice-action').addTransaction txn
      @render 'invoice-action',
        into: 'app'
        outlet: 'invoice-action'
        controller: 'invoice-action'
    closeInvoiceAction: ->
      @disconnectOutlet
        outlet: 'invoice-action',
        parentView: 'app'

`export default AppRoute`
