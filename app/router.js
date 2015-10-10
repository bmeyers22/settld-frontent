import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('missing', { path: '/*missing'});
  this.authenticatedRoute('index', { path: '/' }, function() {
    this.route('app', {
      resetNamespace: true
    }, function () {
      this.route('group', {
        path: '/g/:home_id',
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
            this.route('split');
          });
          this.route('job', function() {
            this.route('category');
            this.route('title');
            this.route('submit');
          });
        });
        this.route('transactions', {
          resetNamespace: true
        }, function() {});
        this.route('jobs', {
          resetNamespace: true
        }, function() {});
      });
      this.route('settings', {
        resetNamespace: true
      }, function() {});
      this.route('homes', {
        resetNamespace: true
      }, function() {
        this.route('new');
        this.route('join');
        this.route('edit', { path: 'edit/:id' });
      });
      this.route('transaction', {
        resetNamespace: true,
        path: 'transaction/:transaction_id'
      });
      this.route('home', function() {
        this.route('edit');
        this.route('new');
      });

    });
    this.route('getstarted', {
      resetNamespace: true
    }, function() {
      this.route('new');
      this.route('join');
    });
    this.route('register', {
      resetNamespace: true
    }, function() {
      this.route('name');
      this.route('payment');
    });
  });


  this.route('login');

});
export default Router
