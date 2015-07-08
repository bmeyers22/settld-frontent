`
import Ember from 'ember'
import config from './config/environment'
`

Router = Ember.Router.extend
  location: config.locationType

Router.map ->
  @route 'missing', path: '/*missing'
  @route 'app', { path: '/' }, ->
    @route 'dashboard', ->
    @route 'homes', ->
      @route 'new'
      @route 'join'
      @route 'edit', path: 'edit/:id'
    @route 'transactions', ->
    @route 'jobs', ->
    @route 'settings', ->
    @route 'create', ->
      @route 'transaction'
      @route 'job'

  @route 'getstarted', ->
    @route 'new'
    @route 'join'
  @route 'login'
  @route 'register'
  @route 'logout'

`export default Router`
