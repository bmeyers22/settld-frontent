`
import Ember from 'ember'
`

HomesJoinController = Ember.Controller.extend
  selectedHome: null
  passwordValid: true
  finishRouteName: 'homes'
  isHomeSelected: (->
    if !@get('selectedHome')
      'disabled'
    else
      false
  ).property('selectedHome')
  onJoinSuccess: (data) ->
    self = this
    if data.success == true
      self.store.find('home', self.get('selectedHome._id')).then (home) ->
        self.session.set 'currentHome', home
        self.session.set 'CURRENT_HOME_ID', self.session.get('currentHome').get('id')
        home.get 'users'
        settings = self.session.get('userSettings')
        settings.set 'isUserConfigured', true
        settings.set 'defaultHome', home.get('id')
        settings.save()
        self.transitionToRoute self.get('finishRouteName')
        return
    else
      self.set 'passwordValid', false
    return
  actions:
    joinHome: ->
      debugger
      new (Ember.RSVP.Promise)((resolve, reject) =>(
        $.post '/api/v1/homes/join',
            home: @get('selectedHome').serialize()
          , resolve).fail(reject)
      ).then (data) =>
        @onJoinSuccess data

`export default HomesJoinController`
