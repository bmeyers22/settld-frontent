`import Ember from 'ember'`

Application = Em.Route.extend

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

