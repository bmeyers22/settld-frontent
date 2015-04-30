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
      @transitionTo 'getstarted.index'
    else
      @transitionTo 'dashboard'
  model: ->
    Ember.Object.create
      authUser: @session.get 'authUser'
      currentHome: @session.get 'currentHome'
  actions:
    openInvoiceAction: ->
      @render 'invoice-action',
        into: 'app'
        outlet: 'invoice-action'
    closeInvoiceAction: ->
      @disconnectOutlet
        outlet: 'invoice-action',
        parentView: 'app'

`export default AppRoute`
