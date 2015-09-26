import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionService: Ember.inject.service('session'),
  websockets: Ember.inject.service(),
  init() {
    try {
      var socket = this.get('websockets').socketFor('ws://localhost:7000/');
      return this.createListeners(socket);
    } catch (e) {
      throw("Socket connection unsuccessful");
    }
  },
  beforeModel(transition) {
    if (!this.session.get('isAuthenticated')) {
      transition.abort();
      this.transitionTo('login');
    }
  },
  model() {
    return this.get('sessionService').initializeUser(this.get('session'), this.get('store'));
  },
  afterModel(model, transition) {
    if (!model.get('userSettings.isUserConfigured')) {
      if (!/^register/.test(transition.targetName)) {
        this.transitionTo('register.name');
      }
    } else if (!model.get('userSettings.isGroupConfigured')) {
      this.transitionTo('getstarted');
    } else if (transition.targetName === 'index.index') {
      this.transitionTo('app');
    }
  },
  createListeners(socket) {
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.messageHandler, this);
    socket.on('close', function(event) {
        console.log('closed');
    }, this);
  },
  myOpenHandler(event) {
    console.log('On open event has been called: ' + event);
  },
  messageHandler(message) {
    console.log(message);
    let response = JSON.parse(message.data);
    return this.get('store').pushPayload(response);
  }
});
