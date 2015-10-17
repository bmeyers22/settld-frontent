import Ember from 'ember';
import config from 'web/config/environment';

export default Ember.Route.extend({
  model() {
    return this.get('currentSession.authUser');
  },
  actions: {
    connect(provider){
      let session = this.get('session');
      this.get('torii').open(provider).then((data) => {
        return this.get('sessionService').linkVenmo(data);
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
