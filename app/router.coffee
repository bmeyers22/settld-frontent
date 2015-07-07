`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend
  location: config.locationType

Router.map ->
  @route 'missing', path: '/*missing'
  @route 'app', { path: '/' }, ->
    @route 'dashboard', resetNamespace: true, ->
    @route 'homes', resetNamespace: true, ->
      @route 'new'
      @route 'join'
      @route 'edit', path: 'edit/:id'
    @route 'transactions', resetNamespace: true, ->
    @route 'jobs', resetNamespace: true, ->
    @route 'settings', resetNamespace: true, ->
  @route 'getstarted', resetNamespace: true, ->
    @route 'new'
    @route 'join'
  @route 'login'
  @route 'register'
  @route 'logout'

`export default Router`
