`import HomesNewController from '../homes/new'`

GetstartedNewController = HomesNewController.extend(saveHome: (home) ->
  self = this
  authUser = @session.get('authUser')
  @_super(home).then (home) ->
    settings = @session.get('userSettings')
    settings.set 'isUserConfigured', true
    settings.set 'defaultHome', home.get('id')
    settings.save()
    return
)

`export default GetstartedNewController`