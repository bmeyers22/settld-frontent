`import Ember from 'ember'`

HomesNewController = Ember.Controller.extend(
  needs: 'application'
  appController: Ember.computed.alias('controllers.application')
  saveHome: (home) ->
    self = this
    authUser = @session.get('authUser')
    prom = new (Ember.RSVP.Promise)((resolve, reject) ->
      home.get('users').then (users) ->
        users.pushObject authUser
        home.save().then ((home) ->
          authUser.get('homes').then (homes) ->
            if @session.get('currentHome')
              self.makeHomeDefault home
            homes.pushObject home
            authUser.save()
            return
          resolve home
          return
        ), (error) ->
          reject error
          return
        return
      return
)
    prom.then (home) ->
      self.get('target').send 'saveHome'
      return
    prom
  makeHomeDefault: (home) ->
    @session.set 'currentHome', home
    @session.set 'CURRENT_HOME_ID', @session.get('currentHome').get('id')
    return
  actions: saveHome: (home) ->
    @saveHome home
    return
)

`export default HomesNewController`

