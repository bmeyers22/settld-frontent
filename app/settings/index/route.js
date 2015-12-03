import Ember from 'ember';
import config from 'web/config/environment';

export default Ember.Route.extend({
    currentSession: Ember.inject.service(),
    model() {
        return this.get('currentSession.authUser');
    },
    actions: {
        updateUserInfo(user) {
            return user.save();
        },
        connect(provider){
            let session = this.get('session');
            this.get('torii').open("venmo-oauth2").then((data) => {
                return this.get('currentSession').linkVenmo(data);
            })
        },
        togglePrivacy() {
            this.set('currentModel.settings.hasPublicProfile', !this.get('currentModel.settings.hasPublicProfile'));
            return this.get('currentModel.settings').save();
        }
    }
});
