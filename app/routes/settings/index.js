
import Ember from 'ember';


export default Ember.Route.extend({
  sessionService: Ember.inject.service('current-session'),
  model() {
    return this.get('currentSession.authUser');
  },
  actions: {
    connect(provider){
      let session = this.get('session');
      this.get('torii').open(provider).then((data) => {
        this.get('sessionService').authenticateUser(this.get('session'), data);
      });
    },
    togglePrivacy() {
      let self = this;
      self.set('currentModel.settings.hasPublicProfile', !self.get('currentModel.settings.hasPublicProfile'));
      Ember.run(function () {
        self.get('currentModel.settings').save();
      });
    }
  }
});
