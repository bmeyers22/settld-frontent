`import Ember from 'ember'`

JobForm = Ember.View.extend(
  attributeBindings: [ 'disabled' ]
  didInsertElement: ->

  actions:
    createJob: (job) ->
      controller = @get('controller')
      @$('.dimmer').dimmer 'show'
      controller.saveJob(job).then (job) =>
        @$('.dimmer').dimmer 'hide'
        controller.transitionToRoute 'dashboard'
)

`export default JobForm`
