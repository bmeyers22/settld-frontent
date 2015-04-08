`import HomesEditableSectionView from './editable-section'`

HomesEditableLocationView = HomesEditableSectionView.extend(didInsertElement: ->
  @_super()
  @$('.state-dropdown').dropdown {}
  self = this
  @$('.ui.form').form { zip:
    identifier: 'zip'
    rules: [ {
      type: 'empty'
      prompt: 'Please enter your zip code'
    } ] },
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

`export default HomesEditableLocationView`

