import Ember from 'ember';
import config from './config/environment';


var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('missing', { path: '/*missing'});
  this.route('index', { path: '/' }, function() {
    this.route('app', {
      resetNamespace: true
    }, function () {
      this.route('group', {
        path: '/g/:group_index',
        resetNamespace: true
      }, function() {
        this.route('dashboard', {
          resetNamespace: true
        }, function() {});
        this.route('create', {
          resetNamespace: true
        }, function() {
          this.route('transaction', function () {
            this.route('category');
            this.route('title');
            this.route('submit');
          });
          this.route('job');
        });
        this.route('homes', {
          resetNamespace: true
        }, function() {
          this.route('new');
          this.route('join');
          this.route('edit', { path: 'edit/:id' });
        });
        this.route('transactions', {
          resetNamespace: true
        }, function() {});
        this.route('jobs', {
          resetNamespace: true
        }, function() {});
        this.route('settings', {
          resetNamespace: true
        }, function() {});
      });
    });
    this.route('getstarted', {
      resetNamespace: true
    }, function() {
      this.route('new');
      this.route('join');
    });
  });


  this.route('login');
  this.route('register');
});
export default Router
