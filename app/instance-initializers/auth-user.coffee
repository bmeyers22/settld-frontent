`import Ember from 'ember'`
`import Session from 'web/models/session'`

# Takes two parameters: container and app
initialize = (instance) ->
  store = instance.container.lookup('service:store')
  session = instance.container.lookup('session:current')
  if window.currentUserData?.user?
    pushData =
      users: [ currentUserData.user ]
      userSettings: currentUserData.settings
      userInfos: currentUserData.infos
      homes: currentUserData.homes
    store.pushPayload pushData
    user = store.peekRecord 'user', currentUserData.user.id
    userSettings = store.peekRecord 'userSetting', currentUserData.settings[0].id
    userInfos = store.peekAll 'userInfo'
    user.set 'settings', userSettings
    session.set 'authUser', user
    session.set 'CURRENT_USER_ID', user.id
    session.set 'userSettings', user.get 'settings'
    if userSettings.get 'isUserConfigured'
      homes = store.peekAll 'home'
      session.set 'currentHome', homes.find (home) ->
        home.get('id') == userSettings.get('defaultHome')
      session.set 'CURRENT_HOME_ID', session.get 'currentHome.id'
      homes.forEach (home) ->
        home.get 'users'
      user.set 'info', userInfos.find (info) ->
        info.get('homeId') == session.get('currentHome.id')
      session.set 'userInfo', user.get 'info'


AuthUserInitializer =
  name: 'auth-user'
  initialize: initialize

`export {initialize}`
`export default AuthUserInitializer`
