`import HomesEditableSectionView from './editable-section'`

HomesEditableInfoView = HomesEditableSectionView.extend(didInsertElement: ->
  @_super()
  self = this
  @$('.ui.form').form {
    name:
      identifier: 'name'
      rules: [ {
        type: 'empty'
        prompt: 'Please give your home a name'
      } ]
    roommateCount:
      identifier: 'roommateCount'
      rules: [ {
        type: 'empty'
        prompt: 'How many roommates are you?'
      } ]
    rentPerMonth:
      identifier: 'rentPerMonth'
      rules: [
        {
          type: 'empty'
          prompt: 'Please enter your rent'
        }
        {
          type: 'number'
          prompt: 'Numbers only please'
        }
        {
          type: 'gt[0]'
          prompt: 'Rent should be greater than 0'
        }
      ]
  },
    on: 'blur'
    onValid: ->
      @parent().parent().addClass 'valid'
      return
    onInvalid: ->
      @parent().parent().removeClass 'valid'
      return
    onSuccess: ->
      self.send 'saveEdit', self.get('content')
      return
    onFailure: ->
      console.log 'Invalid form'
      return
  return
)
`export default HomesEditableInfoView`
