import Ember from 'ember';

var Login = Ember.Route.extend({
  actions: {
    login(provider){
      let session = this.get('session');
      const route = this;
      this.get('toriiSession').open(provider).then(() => {
        route.transitionTo('app');
      });
    },
    registered() {
      this.transitionto('register.name');
    }
  }
});

export default Login
