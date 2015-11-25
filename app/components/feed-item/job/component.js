import Ember from 'ember';
import Transaction from 'web/models/transaction';
import Job from 'web/models/job';

export default Ember.Component.extend({
    classNames: ['event'],
    currentSession: Ember.inject.service(),
    displayName: Ember.computed('item.user.currentState.isLoading', function() {
        let isMe = this.get('item.user.content') === this.get('currentSession.authUser');
        if (isMe) {
            return 'You';
        } else {
            return this.get('item.user.content.firstName');
        }
    })
});
