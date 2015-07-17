import Ember from 'ember';
import config from './config/environment';


var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('missing', { path: '/*missing'});
  this.route('index', { path: '/' }, function() {
    this.resource('group', { path: '/g/:group_index' }, function() {
      this.resource('dashboard', function() {});
      this.resource('create', function() {
        this.route('transaction');
        this.route('job');
      });
      this.resource('homes', function() {
        this.route('new');
        this.route('join');
        this.route('edit', { path: 'edit/:id' });
      });
      this.resource('transactions', function() {});
      this.resource('jobs', function() {});
      this.resource('settings', function() {});
    });
  });

  this.resource('getstarted', function() {
    this.route('new');
    this.route('join');
  });

  this.route('login');
  this.route('register');
  this.route('getstarted');
});
export default Router
