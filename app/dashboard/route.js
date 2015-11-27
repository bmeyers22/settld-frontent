import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return Promise.all([
            this.store.query('transaction', {
                orderBy: 'home',
                equalTo: this.get('currentSession.currentHome.id')
            }),
            this.store.query('job', {
                orderBy: 'home',
                equalTo: this.get('currentSession.currentHome.id')
            })
        ]).then( (response) => {
            return {
                feedList: [
                    this.get('store').peekAll('transaction'),
                    this.get('store').peekAll('job')
                ]
            }
        });
    }
});
