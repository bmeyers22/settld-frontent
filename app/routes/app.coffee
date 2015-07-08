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
      @transitionTo 'dashboard' if /^app/.test transition.targetName
  model: ->
    Ember.Object.create
      authUser: @session.get 'authUser'
      currentHome: @session.get 'currentHome'
  actions:
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
