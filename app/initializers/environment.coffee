`import Ember from 'ember'`

# Takes two parameters: container and app
initialize = (registry, application) ->
  APP_ENV =
    PROXY_URL: application.PROXY_URL
    LOGIN_URL: "#{application.PROXY_URL}login"
    FACEBOOK_LOGIN_URL: "#{application.PROXY_URL}users/auth/facebook"
    VENMO_LOGIN_URL: "#{application.PROXY_URL}users/auth/venmo"
    LOGOUT_URL: "#{application.PROXY_URL}logout"

  Ember.$.getJSON("/users/token.json").then (tokenData) ->
    $meta = $ '<meta/>'
    $meta.attr
      name: 'csrf-token'
      content: tokenData.csrfToken
    $('head').append $meta
    $ ->
      token = tokenData.csrfToken
      $.ajaxPrefilter (options, originalOptions, xhr) ->
        xhr.setRequestHeader('X-CSRF-Token', token)



  application.register 'environment:default', APP_ENV, instantiate: false
  application.inject 'controller', 'APP_ENV', 'environment:default'
  application.inject 'route', 'APP_ENV', 'environment:default'

EnvironmentInitializer =
  name: 'environment'
  after: 'store'
  initialize: initialize

`export {initialize}`
`export default EnvironmentInitializer`
