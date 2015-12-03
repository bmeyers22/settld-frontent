import Ember from 'ember';

export default Ember.Component.extend({
    hasPublicProfile: Ember.computed('user.settings.hasPublicProfile', function () {
        return this.get('user.settings.hasPublicProfile') ? 'checked' : '';
    }),
    privacyLabel: Ember.computed('user.settings.hasPublicProfile', function () {
        return this.get('user.settings.hasPublicProfile') ? 'Public' : 'Private';
    }),
    userObserver: Ember.observer('user.hasDirtyAttributes', function () {
        this.sendAction('updateUserInfo', this.get('user'));
    }),
    actions: {
        connect() {
            this.sendAction('connect');
        }
    },
    didInsertElement() {
        let self = this;
        this.$('.ui.toggle.checkbox').checkbox({
            onChange() {
                Ember.run(() => {
                    self.sendAction('togglePrivacy');
                })
            }
        });
    }
});
