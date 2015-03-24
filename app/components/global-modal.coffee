`import Ember from 'ember'`

Modal = Ember.Component.extend
  actions:
    complete: ->
      # @$('.dimmer').dimmer 'show'
      debugger
      @sendAction "complete"

  didInsertElement: ->
    @$('.ui.global.modal').modal(
      detachable: false
      selector:
        close: '.close',
        approve: '.actions .positive, .actions .approve, .actions .ok',
        deny: '.actions .negative, .actions .deny, .actions .cancel'
      onHide: =>
        @$('.dimmer').dimmer 'hide'
      onHidden: =>
        @sendAction "close"
    ).modal 'show'

`export default Modal`
