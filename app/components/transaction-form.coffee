`import Ember from 'ember'`

TransactionForm = Ember.Component.extend
  actions:
    complete: ->
      @sendAction "complete"
  didInsertElement: ->
    @$('.ui.category.dropdown').dropdown
      onChange: (value, text) =>
        @set 'model.category', value

    @$('.ui.checkbox.split').checkbox
      onEnable: =>
        @set 'model.split', true

      onDisable: =>
        @set 'model.split', false

    @form = @$('.ui.form').form
        title:
          identifier: 'title'
          rules: [ {
            type: 'empty'
            prompt: 'Please enter a title'
          } ]

        category:
          identifier: 'category'
          rules: [ {
            type: 'empty'
            prompt: 'Please select a category'
          } ]
        description:
          identifier: 'description'
          rules: [ {
            type: 'empty'
            prompt: 'Please enter a description'
          } ]
        cost:
          identifier: 'cost'
          rules: [
            {
              type: 'number'
              prompt: 'Please enter a cost'
            }
            {
              type: 'gt[0]'
              prompt: 'Please enter a cost'
            }
            {
              type: 'lt[1000000]'
              prompt: 'Please enter a cost'
            }
          ]
      ,
        onSuccess: =>
          @sendAction 'complete', @get('model')
        onFailure: =>
          console.log "Fail"

    $('.global.modal').on "click", ".submit", =>
      @form.form "submit"

`export default TransactionForm`
