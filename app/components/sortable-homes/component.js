import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['sortable-homes-wrapper'],
    currentSession: Ember.inject.service(),
    setDefaultHome(id) {
        var settings = this.get('currentSession.authUser.settings');
        settings.set('defaultHome', id);
        settings.save();
        return;
    },
    actions: {
        itemMoved(home, lastPosition, newPosition) {
            if (newPosition === 0) {
                this.setDefaultHome(home.get('id'));
            }
        }
    },
    didInsertElement() {
    }
});
