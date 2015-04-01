`import Ember from 'ember'`

Application = Ember.Route.extend

  actions:
    showModal: (name, model) ->
      @render name,
        into: 'application'
        outlet: 'modal'

    closeModal: ->
      @disconnectOutlet
        outlet: "modal" 
        parentView: 'application'

`export default Application`
