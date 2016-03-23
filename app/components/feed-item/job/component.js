import Ember from 'ember';
import Job from 'web/models/job';

export default Ember.Component.extend({
    classNames: ['event'],
    currentSession: Ember.inject.service(),
    firebase: Ember.inject.service(),
    numberOfLikes: 0,
    hasLikedJob: false,
    displayName: Ember.computed('item.user.currentState.isLoading', function() {
        let isMe = this.get('item.user.content') === this.get('currentSession.authUser');
        if (isMe) {
            return 'You';
        } else {
            return this.get('item.user.content.firstName');
        }
    }),
    actions: {
        toggleLike() {
            if (this.get('hasLikedJob')) {
                let userRef = this.getUserLikedRef();
                userRef.once('value', (snapshot) => {
                    this.get('firebase').child(`jobLikes/${snapshot.val()}`).remove();
                    userRef.remove();
                })
            } else {
                let ref = this.get('firebase').child('jobLikes').push({
                    user: this.get('currentSession.authUser.id'),
                    job: this.get('item.id')
                });
                this.getUserLikedRef().set(ref.key());
            }
            return false;
        }
    },
    getUserLikedRef() {
        return this.get('firebase').child(`userJobLikes/${this.get('currentSession.authUser.id')}/${this.get('item.id')}`);
    },
    userLikedObserver: Ember.on('init', function () {
        let ref = this.getUserLikedRef().on('value', (snapshot) => {
            if (snapshot.exists()) {
                this.set('hasLikedJob', true);
            } else {
                this.set('hasLikedJob', false);
            }
        });
    }),
    likesObserver: Ember.on('init', function () {
        let ref = this.get('firebase').child('jobLikes').orderByChild('job').equalTo(this.get('item.id')).on('value', (snapshot) => {
            this.set('numberOfLikes', snapshot.numChildren());
        });
    }),
});
