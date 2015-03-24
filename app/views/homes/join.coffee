`import Ember from 'ember'`
`import Serializable from 'frontend/mixins/serializable'`

HomesJoinView = Ember.View.extend
  query: ''
  searchResults: Ember.A()
  canSubmitForm: (->
    if @get('controller.selectedHome') then '' else 'disabled'
  ).property('controller.selectedHome')
  onPasswordSubmit: (->
    self.$('.ui.form.join-password .field').removeClass 'loading'
    self.$('.ui.form.join-password').form 'validate form'
    return
  ).observes('controller.passwordValid')
  didInsertElement: ->
    self = this
    controller = @get('controller')
    @$('.ui.form.join-password').form { password:
      identifier: 'password'
      rules: [
        {
          type: 'empty'
          prompt: 'Please enter a password.'
        }
        {
          type: 'validPassword[passwordValid]'
          prompt: 'Incorrect password.'
        }
      ] },
      on: 'blur'
      onInvalid: ->
        controller.set 'passwordValid', true
        return
      onSuccess: ->
        self.$('.ui.form.join-password .field').addClass 'loading'
        self.get('controller').send 'joinHome'
        return
    @$('.ui.form.join-password').form 'get change event', (e) ->
      console.log e
      return
    return
  actions:
    findHomes: ->
      self = this
      @$('home-results').addClass 'loader'
      controller = @get "controller"
      console.log controller
      controller.set 'selectedHome', null
      $.get '/api/v1/homes/search', { filter: @get('query') }, (data) ->
        if data.results.length == 0
          self.set 'searchResults', Ember.A(null)
        else
          arr = Ember.A()
          _.each data.results, (obj) ->
            obj.password = ''
            obj.selected = false
            arr.pushObject Ember.Object.extend(Serializable).create(obj)
          self.set 'searchResults', arr
        self.$('home-results').removeClass 'loader'
        return
      return
    homeSelected: (home) ->
      controller = @get "controller"
      console.log controller
      selectedHome = controller.get 'selectedHome'
      if selectedHome
        selectedHome.set 'selected', false
        if selectedHome == home
          controller.set 'selectedHome', null
        else
          controller.set 'selectedHome', home
          controller.set 'selectedHome.selected', true
      else
        controller.set 'selectedHome', home
        controller.set 'selectedHome.selected', true
      return

`export default HomesJoinView`