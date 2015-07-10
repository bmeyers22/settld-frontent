`
import Ember from 'ember'
import config from './config/environment'
`

Router = Ember.Router.extend
  location: config.locationType

Router.map ->
  @route 'missing', path: '/*missing'
  @resource 'app', { path: '/' }, ->
    @resource 'dashboard', ->
    @resource 'create', ->
      @route 'transaction'
      @route 'job'
    @resource 'homes', ->
      @route 'new'
      @route 'join'
      @route 'edit', path: 'edit/:id'
    @resource 'transactions', ->
    @resource 'jobs', ->
    @resource 'settings', ->
    @resource 'create', ->
      @route 'transaction'
      @route 'job'

  @resource 'getstarted', ->
    @route 'new'
    @route 'join'
  @route 'login'
  @route 'register'
  @route 'logout'
  @route 'create/job'
`export default Router`
