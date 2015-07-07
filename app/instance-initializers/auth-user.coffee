`import Ember from 'ember'`
`import Session from 'web/models/session'`

# Takes two parameters: container and app
initialize = (instance) ->
  store = instance.container.lookup('service:store')
  session = instance.container.lookup('session:current')
  Ember.$.getJSON("/users/current.json").then (raw_user) ->
    if raw_user?.user?
      user = store.find("user", raw_user.user._id).then (user) ->
        session.set 'authUser', user
        session.set 'CURRENT_USER_ID', user.get('id')
        store.find('userSetting', user_id: user.get('id')).then (settings) ->
          settingsObj = settings.get('content.firstObject')
          session.set 'userSettings', settingsObj
          user.set 'settings', settingsObj
          # And continue on to loading the app, all prereqs are loaded
          if !settingsObj.get('isUserConfigured')
            application.advanceReadiness()
          else
            user.get('homes').then (homes) ->
              defaultHome = homes.find((home) ->
                home.get('id') == settingsObj.get('defaultHome')
              )
              session.set 'currentHome', defaultHome
              session.set 'CURRENT_HOME_ID', session.get('currentHome').get('id')
              homes.forEach (home) ->
                home.get 'users'
                return
              store.find('userInfo',
                user_id: session.get('authUser.id')
                home_id: session.get('currentHome.id')).then (data) ->
                data = data.get('content.firstObject')
                session.set 'userInfo', data
                user.set 'info', data
  , ->


AuthUserInitializer =
  name: 'auth-user'
  initialize: initialize

`export {initialize}`
`export default AuthUserInitializer`
