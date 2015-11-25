import Ember from 'ember';

export default Ember.Component.extend({
    currentSession: Ember.inject.service(),
    balanceKey: Ember.computed('user.id', function () {
        return `currentHomeInfo.users.${this.get('user.id')}.balance`
    }),
    toDoKey: Ember.computed('user.id', function () {
        return `currentHomeInfo.users.${this.get('user.id')}.choresToDo`
    })
});
