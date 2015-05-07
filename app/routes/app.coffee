`
import Ember from 'ember'
`

AppRoute = Ember.Route.extend
  beforeModel: (transition) ->
    if not @session.get('authUser')?
      @transitionTo 'login'
    settings = @session.get 'userSettings'
    if not settings.get 'isUserConfigured'
      transition.abort()
      @transitionTo 'getstarted'
    @transitionTo 'dashboard' if /^app/.test transition.targetName
  model: ->
    Ember.Object.create
      authUser: @session.get 'authUser'
      currentHome: @session.get 'currentHome'
  actions:
    openInvoiceAction: (txn, invoice) ->
      this.controllerFor('invoice-action').get('transactions').pushObject txn
      this.controllerFor('invoice-action').get('invoices').pushObject invoice
      @render 'invoice-action',
        into: 'app'
        outlet: 'invoice-action'
        controller: 'invoice-action'
    closeInvoiceAction: ->
      @disconnectOutlet
        outlet: 'invoice-action',
        parentView: 'app'

`export default AppRoute`
