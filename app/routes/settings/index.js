import Ember from 'ember';
import config from 'web/config/environment';

export default Ember.Route.extend({
  currentSession: Ember.inject.service(),
  model() {
    return this.get('currentSession.authUser');
  },
  actions: {
    connect(provider){
      let session = this.get('session');
      this.get('torii').open("venmo-oauth2").then((data) => {
        return this.get('currentSession').linkVenmo(data);
      })
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
