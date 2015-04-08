`import HomesEditableSectionView from './editable-section'`

HomesEditablePasswordView = HomesEditableSectionView.extend
  didInsertElement: ->
    @_super()
    self = this
    @$('.ui.form').form
      currentPassword:
        identifier: 'currentPassword'
        rules: [ {
          type: 'empty'
          prompt: 'Please enter a password'
        } ]
      password:
        identifier: 'password'
        rules: [
          {
            type: 'empty'
            prompt: 'Please enter a password'
          }
          {
            type: 'length[8]'
            prompt: 'Your password must be at least 8 characters'
          }
        ]
      passwordConfirmation:
        identifier: 'passwordConfirmation'
        rules: [ {
          type: 'match[password]'
          prompt: 'Passwords must match'
        } ]
    ,
    on: 'blur'
    onValid: ->
      @parent().parent().addClass 'valid'
    onInvalid: ->
      @parent().parent().removeClass 'valid'
    onSuccess: ->
      self.send 'saveEdit', self.get('content')
    onFailure: ->
      console.log 'Invalid form'

`export default HomesEditablePasswordView`