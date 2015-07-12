
import Ember from 'ember'
import config from './config/environment'


var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('missing', path: '/*missing'});
  this.resource('app', { path: '/' }, function() {
    return this.resource('group', { path: '/g/:group_index' }, function() {
      this.resource('dashboard', function() {});
      this.resource('create', function() {
        this.route('transaction');
        return this.route('job');
      });
      this.resource('homes', function() {
        this.route('new');
        this.route('join');
        return this.route('edit', path: 'edit/:id'});
      });
      this.resource('transactions', function() {});
      this.resource('jobs', function() {});
      this.resource('settings', function() {});
      return this.resource('create', function() {
        this.route('transaction');
        return this.route('job');
      });
    });
  });

  this.resource('getstarted', function() {
    this.route('new');
    return this.route('join');
  });
  this.route('login');
  this.route('register');
  this.route('logout');
  return this.route('create/job');
});
export default Router
